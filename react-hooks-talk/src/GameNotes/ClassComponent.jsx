import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

// Step 9: extract custom hook
class ClassComponent extends Component {
  constructor(props) {
    super(props);
    // Step 1a: add guessInput to state
    this.state = {
      guessInput: "Guess",
      previousGuesses: [],
      loadingGame: true,
      windowWidth: window.innerWidth
    };
    // Step 2a: add previousGuesses to state
  }
  // Step 5: add useEffect to reset/loadGame
  // Step 5a: add loadingGame to state
  // Step 5c: wrap in timeout
  // Step 5d: set up dispatch reset action from Redux store
  // Step 6: and cleanup function
  // Step 6a: clearTimeout in cleanup function
  componentDidMount() {
    console.log("Component did mount");
    // dispatch action to resetGame
    this.delay = setTimeout(() => {
      this.props.loadGame();
      this.setState({ loadingGame: false });
    }, 2000);
    document.title = this.state.guessInput;
    // Step 3a: add event listener in a separate useEffect
    window.addEventListener('resize', this.handleResize);
  }
  // Step 3: add useEffect to update document.title
  componentDidUpdate() {
    console.log("Component did update");
    document.title = this.state.guessInput;
  }

  componentWillUnmount() {
    console.log("Component will unmount");
    clearTimeout(this.delay);
    // Step ?
    this.props.resetGame();
    // Step 3b: remove eventListener in cleanup function
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({windowWidth: window.innerWidth});
  }

  // Step 1b: add the change handler function and update guessInput state value
  guessInputChangeHandler = (e) => {
    this.setState({ guessInput: e.target.value });
  };
  
  // Step 7: finish TODO from step 2d
  // Step 1c: add the submit handler function
  // Step 2b+c: update previousGuesses and guess input in state
  // Step 2d: add TODO to dispatch action to checkGuess
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
            {/* Step 5b: copy loadingGame logic */}
            {this.state.loadingGame ? (
              <h3>Selecting the secret phrase...</h3>
            ) : (
              <h3>Secret phrase has been selected</h3>
            )}
            {/* Step 8: copy logic
            Step 8a: connect to redux store */}
            {this.props.guessedCorrectly && <h3>You won!</h3>}
            {this.props.gameOver && !this.props.guessedCorrectly && (
              <h3>No more guesses!</h3>
            )}
            {/* Step 4: copy the guesses remaining 
            Step 4a: connect to redux store*/}
            <div className="counter-holder">
              <p>Guesses remaining: {this.props.guessNumber} </p>
            </div>
            {/* Step 1: copy the input field and button */}
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
            {/* Step 2: Copy the guesses list */}
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
    resetGame: () => dispatch({ type: 'RESETGAME' }),
    loadGame: () => dispatch({ type: "LOADGAME" }),
    checkGuess: (guess) => dispatch({ type: "CHECKGUESSCLASS", payload: guess }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassComponent);
