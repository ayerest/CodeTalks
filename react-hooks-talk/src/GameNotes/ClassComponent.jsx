import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guessInput: "Guess",
      previousGuesses: [],
      gettingSecretPhrase: true,
    };
  }

  componentDidMount() {
    console.log("Component did mount");
    // dispatch action to resetGame
    this.delay = setTimeout(() => {
      this.props.resetGame();
      this.setState({ gettingSecretPhrase: false });
    }, 2000);
    document.title = this.state.guessInput;
  }

  componentDidUpdate() {
    console.log("Component did update");
    document.title = this.state.guessInput;
  }

  componentWillUnmount() {
    console.log("Component will unmount");
    clearTimeout(this.delay);
  }

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
        <Grid container spacing={1} justify="center">
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetGame: () => dispatch({ type: "RESETCLASS" }),
    checkGuess: (guess) => dispatch({ type: "CHECKGUESSCLASS", payload: guess }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassComponent);
