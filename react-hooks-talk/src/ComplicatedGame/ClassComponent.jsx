import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";

class ClassComponent extends Component {
  constructor() {
    super();
    this.state = {
      guessInput: "",
      previousGuesses: [],
      checkingGuess: false,
    };
  }

  componentDidMount = () => {
    console.log("component is mounted")
    // reset the game when the component is mounted 
    this.handleResetGame();
  }

  componentDidUpdate = () => {
    console.log("updating");
  }

  componentWillUnmount = () => {
    console.log("component unmounted")
    // clear the timeout here
    clearTimeout(this.timer);
  }

  handleGuessInputChange = (e) => {
    this.setState({guessInput: e.target.value});
  }

  handleGuessSubmission = () => {
    this.setState({checkingGuess: true});
    this.timer = setTimeout(() => {
      this.props.checkGuess(this.state.guessInput)
      this.setState((state) => ({
        guessInput: "",
        previousGuesses: [...state.previousGuesses, state.guessInput],
        checkingGuess: false,
      }));
    }, 2000)
  };

  handleResetGame = () => {
    this.setState({previousGuesses: [], checkingGuess: false});
    return this.props.resetGame();
  }

  render() {
    return (
      <div className="component class">
        <h2>Class Component</h2>
        {this.state.checkingGuess && <CircularProgress />}
        {this.props.guessedCorrectly && <h3>"You Guessed Correctly! I like you the way you are"</h3>}
        {this.props.gameOver && !this.props.guessedCorrectly && <h3>"Game Over. I said, 'see you later, boy'"</h3>}
        <div className="counter-holder">
          <p>Guesses remaining: {this.props.guessNumber}</p>
        </div>
        <div className="inputInfo">
          <div className="inputHolder">
            <label>Guess the word!</label>
            <TextField
              id="filled-basic"
              label="Input 1"
              variant="outlined"
              value={this.state.guessInput}
              onChange={this.handleGuessInputChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleGuessSubmission}
              disabled={this.props.gameOver}
            >
              submit guess
            </Button>
          </div>
          <div className="inputHolder">
            <p>Guesses so far...</p>
            <ul>
              {this.state.previousGuesses &&
                this.state.previousGuesses.map((guess) => (
                  <li key={Math.random()}>{guess}</li>
                ))}
            </ul>
          </div>
        </div>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleResetGame}
        >
          Reset Game
        </Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    guessNumber: state.guessNumber,
    secretWord: state.secretWord,
    guessedCorrectly: state.guessedCorrectly,
    gameOver: state.gameOver,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetGame: () => dispatch({ type: "RESET" }),
    checkGuess: (guess) => dispatch({ type: 'CHECKGUESS', payload: guess }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassComponent);