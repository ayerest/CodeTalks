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
      loadingGame: true,
      windowWidth: window.innerWidth,
    };
  }
  
  componentDidMount() {
    console.log("Component did mount");
    this.delay = setTimeout(() => {
      this.props.loadGame();
      this.setState({ loadingGame: false });
    }, 2000);
    document.title = this.state.guessInput;
    window.addEventListener("resize", this.handleResize);
  }

  componentDidUpdate() {
    console.log("Component did update");
    document.title = this.state.guessInput;
  }

  componentWillUnmount() {
    console.log("Component will unmount");
    clearTimeout(this.delay);
    this.props.resetGame();
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  guessInputChangeHandler = (e) => {
    this.setState({ guessInput: e.target.value });
  };

  guessSubmitHandler = () => {
    this.props.checkGuess(this.state.guessInput);
    this.setState((state, props) => ({
      previousGuesses: [...state.previousGuesses, state.guessInput],
      guessInput: "",
    }));
  };

  render() {
    return (
      <div className="component class">
        <h2>Class Component</h2>
        <p>Window width: {this.state.windowWidth}</p>
        <Grid container spacing={1} justify="center">
          <Grid
            container
            item
            xs={6}
            spacing={1}
            direction="column"
            alignItems="center"
          >
            {this.state.loadingGame ? (
              <h3>Selecting the secret phrase...</h3>
            ) : (
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
                  disabled={this.props.gameOver || this.state.loadingGame}
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
    resetGame: () => dispatch({ type: "RESETGAME" }),
    loadGame: () => dispatch({ type: "LOADGAME" }),
    checkGuess: (guess) =>
      dispatch({ type: "CHECKGUESSCLASS", payload: guess }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassComponent);
