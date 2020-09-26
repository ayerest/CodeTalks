import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guessInput: "Guess",
      previousGuesses: [],
      gettingSecretPhrase: true,
      randomBook: null,
    };
  }

  controller = new AbortController();

  componentDidMount() {
    console.log("Component did mount");
    // dispatch action to select secret phrase
  }

  componentDidUpdate() {
    console.log("Component did update");
    // update doc title
  }

  componentWillUnmount() {
    console.log("Component will unmount");
    // reset game, clear timeout, abort network requset
  }

  getRandomBook = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=inauthor:${
          this.props.authors[
            Math.floor(Math.random() * this.props.authors.length)
          ]
        }&printType=books&projection=lite&orderBy=relevance&maxResults=1&startIndex=0&fields=items(selfLink,volumeInfo(title,authors,description,imageLinks))`,
        {
          signal: this.controller.signal,
        }
      );
      const data = await response.json();
      this.setState({ randomBook: data.items[0] });
    } catch (error) {
      console.log(error.message);
    }
  };

  guessInputChangeHandler = (e) => {
    this.setState({ guessInput: e.target.value });
  };

  guessSubmitHandler = () => {
    // dispatch 'CHECKGUESS' action to the redux store
    this.props.checkGuess(this.state.guessInput);
    this.setState((state, props) => ({
      previousGuesses: [...state.previousGuesses, state.guessInput],
      guessInput: "",
    }));
  };

  render() {
    return (
      <div className="component">
        <h2>Class Component</h2>
        <Grid container spacing={2} justify="center">
          <Grid
            container
            item
            xs={6}
            spacing={1}
            direction="column"
            alignItems="center"
          >
            <h3>Book of the Day</h3>
            <List>
              {this.state.randomBook && (
                <div className="bookInfo" key={this.state.randomBook.selfLink}>
                  <img
                    src={this.state.randomBook.volumeInfo.imageLinks.thumbnail}
                    alt={this.state.randomBook.volumeInfo.title}
                  />
                  <ListItemText
                    primary={this.state.randomBook.volumeInfo.title}
                    secondary={`by ${this.state.randomBook.volumeInfo.authors[0]}`}
                  />
                </div>
              )}
            </List>
          </Grid>
          <Grid
            container
            item
            xs={6}
            spacing={1}
            direction="column"
            alignItems="center"
          >
            {this.state.gettingSecretPhrase && (
              <h3>Selecting the secret phrase...</h3>
            )}
            {!this.state.gettingSecretPhrase && (
              <h3>Secret phrase has been selected</h3>
            )}
            {this.props.guessedCorrectly && <h3>You won!</h3>}
            {this.props.gameOver && !this.props.guessedCorrectly && (
              <h3>No more guesses!</h3>
            )}
            <div className="counter-holder">
              <p>Guesses remaining: {this.props.guessNumber} </p>
            </div>
            <div className="inputInfo">
              <div className="inputHolder">
                <TextField
                  id="filled-basic"
                  label="Guess the phrase"
                  variant="outlined"
                  onChange={this.guessInputChangeHandler}
                  value={this.state.guessInput}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.guessSubmitHandler}
                  disabled={
                    this.props.gameOver || this.state.gettingSecretPhrase
                  }
                >
                  Submit Guess
                </Button>
              </div>
            </div>
            <div className="inputHolder">
              <p>Guesses so far...</p>
              {this.state.previousGuesses.length > 0 && (
                <ul>
                  {this.state.previousGuesses.map((guess) => (
                    <li key={Math.random()}>{guess}</li>
                  ))}
                </ul>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    guessNumber: state.class.guessNumber,
    guessedCorrectly: state.class.guessedCorrectly,
    gameOver: state.class.gameOver,
    secretPhrase: state.class.secretWord,
    authors: state.class.authors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetGame: () => dispatch({ type: "RESETCLASS" }),
    checkGuess: (guess) =>
      dispatch({ type: "CHECKGUESSCLASS", payload: guess }),
    selectPhrase: () => dispatch({ type: "SELECTPHRASECLASS" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassComponent);
