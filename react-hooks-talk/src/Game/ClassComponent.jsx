import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
class ClassComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guessInput: "",
      previousGuesses: [],
      gettingSecretPhrase: true,
    };
  }

  componentDidMount() {
    console.log("Component did mount")
    // dispatch action to select secret phrase
  }

  componentDidUpdate() {
    console.log("Component did update")
  }

  componentWillUnmount() {
    console.log("Component will unmount")
    // dispatch action to reset game
  }

  guessInputChangeHandler = (e) => {
  };

  guessSubmitHandler = () => {
    // dispatch 'CHECKGUESS' action to the redux store
  };

  render() {

    return (
      <div className="component">
        <h2>Class Component</h2>
        {/* {this.state.gettingSecretPhrase && <h3>Selecting the secret phrase...</h3>}
        {!this.state.gettingSecretPhrase &&<h3>Secret phrase has been selected</h3>} */}
        {/* {this.props.guessedCorrectly && <h3>You won!</h3>}
        {this.props.gameOver && !this.props.guessedCorrectly && <h3>No more guesses!</h3>} */}
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
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.guessSubmitHandler}
              disabled={this.props.gameOver}
            >
              Submit Guess
            </Button>
          </div>
        </div>
        <div className="inputHolder">
          <p>Guesses so far...</p>
          {/* {this.state.previousGuesses.length > 0 && 
            <ul>
              {this.state.previousGuesses.map((guess) => 
              <li key={Math.random()}>{guess}</li>)
              }
            </ul>
          } */}
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    guessNumber: state.guessNumber,
    guessedCorrectly: state.guessedCorrectly,
    gameOver: state.gameOver,
    secretPhrase: state.secretWord,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetGame: () => dispatch({ type: "RESET" }),
    checkGuess: (guess) => dispatch({ type: "CHECKGUESS", payload: guess }),
    selectPhrase: () => dispatch({type: "SELECTPHRASE"}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassComponent);
