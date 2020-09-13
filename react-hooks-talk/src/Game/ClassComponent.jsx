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
    }, 1000)
  };

  handleResetGame = () => {
    this.setState({previousGuesses: [], checkingGuess: false, guessInput: ''});
    return this.props.resetGame();
  }

  render() {
    return (
      <div className="component class">
        <h2>Class Component</h2>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleResetGame}
        >
          Reset Game
        </Button>
        {this.state.checkingGuess && <CircularProgress />}
        {this.props.guessedCorrectly && <h3>"You Guessed Correctly! I like you the way you are"</h3>}
        {this.props.gameOver && !this.props.guessedCorrectly && <h3>"Game Over. I said, 'see you later, boy'"</h3>}
        <div className="counter-holder">
          <p>Guesses remaining: {this.props.guessNumber}</p>
        </div>
        <div className="inputInfo">
          <div className="inputHolder">
            <TextField
              id="filled-basic"
              label="Guess the phrase"
              variant="outlined"
              value={this.state.guessInput}
              onChange={this.handleGuessInputChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleGuessSubmission}
              disabled={this.props.gameOver || this.state.checkingGuess}
            >
              submit guess
            </Button>
          </div>
        </div>
        <div className="inputHolder">
          <p>Guesses so far...</p>
          {this.state.previousGuesses.length > 0 && <ul>
            {this.state.previousGuesses &&
              this.state.previousGuesses.map((guess) => (
                <li key={Math.random()}>{guess}</li>
              ))}
          </ul>}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    guessNumber: state.guessNumber,
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