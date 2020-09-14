import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";

class ClassComponent extends Component {
  constructor() {
    super();
    this.state = {
        guessInput: '',
        previousGuesses: [],
        checkingGuess: false
    }
  }

  componentDidMount() {
    //   this.props.resetGame();
  }

  componentDidUpdate() {
      console.log("class component update");
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  guessInputChangeHandler = (e) => {
      this.setState({guessInput: e.target.value});
  }

  guessSubmitHandler = () => {
      this.setState({checkingGuess: true})
      this.timer = setTimeout(() => {
          this.props.checkGuess(this.state.guessInput);
          this.setState({
              previousGuesses: [...this.state.previousGuesses, this.state.guessInput],
              guessInput: '',
              checkingGuess: false,
            })
        //   this.setState({guessInput: ''});
        //   this.setState({checkingGuess: false})
      }, 1000)
  }

  resetGameHandler = () => {
      this.props.resetGame();
      this.setState({
          previousGuesses: [],
          guessInput: '',
          checkingGuess: false,
      })
  }

  render() {
    return (
      <div className="component class">
        <h2>Class Component</h2>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.resetGameHandler}
        >
          Reset Game
        </Button>
        
        {this.props.gameOver && this.props.guessedCorrectly && <h3>You guessed correctly! You won!</h3>}
        {this.props.gameOver && !this.props.guessedCorrectly && <h3>No more guesses! You Lost!</h3>}
        {this.state.checkingGuess && <CircularProgress />}
        <div className="counter-holder">
          <p>Guesses remaining: {this.props.guessNumber} </p>
        </div>
        <div className="inputInfo">
          <div className="inputHolder">
            <TextField
              id="filled-basic"
              label="Guess the phrase"
              variant="outlined"
              value={this.state.guessInput}
              onChange={this.guessInputChangeHandler}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.guessSubmitHandler}
              disabled={this.props.gameOver || this.state.checkingGuess}
              
            >
              submit guess
            </Button>
          </div>
        </div>
        <div className="inputHolder">
          <p>Guesses so far...</p>
          {this.state.previousGuesses.length > 0 && <ul>
              {this.state.previousGuesses.map((guess) => <li key={Math.random()}>{guess}</li>)}
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