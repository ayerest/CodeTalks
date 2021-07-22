import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../GameStore/Actions/FunctionalActions';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

const useCustomHookName = () => {
  const dispatch = useDispatch();
  const [gettingSecretPhrase, setGettingSecretPhrase] = useState(true);
  // only runs when component is mounted (dispatch and setGettingSecretPhrase are stable aka won't change)
  useEffect(() => {
    // dispatch action to resetGame
    const timer = setTimeout(() => {
      dispatch(actions.load());
      setGettingSecretPhrase(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, setGettingSecretPhrase]);
  return gettingSecretPhrase;
};

const FunctionalComponent = () => {
  const [guessInput, setGuessInput] = useState("Guess");
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const gettingSecretPhrase = useCustomHookName();
  const guessedCorrectly = useSelector(
    (state) => state.functional.guessedCorrectly
  );
  const gameOver = useSelector((state) => state.functional.gameOver);
  const guessNumber = useSelector((state) => state.functional.guessNumber);

  const dispatch = useDispatch();

  // runs on every update
  useEffect(() => {
    console.log("use effect")
    document.title = guessInput;
    // add guessInput to dependency array, then remove setting guess input to an empty string in the submit handler
  }, [guessInput]);

  useEffect(() => {
    console.log("window width");
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [windowWidth]);

  useEffect(() => {
    return () => {
      dispatch(actions.reset())
      console.log("reset game")
    }
  }, [dispatch]);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  }

  const guessInputChangeHandler = (e) => {
    setGuessInput(e.target.value);
  };

  const guessSubmitHandler = () => {
    // add guess to previous guesses list, dispatch redux store, reset guess input
    setPreviousGuesses((prevState) => [...prevState, guessInput]);
    dispatch(actions.checkGuess(guessInput));
    // setGuessInput("");
  };

  return (
    <div className="component">
      <h2>Functional Component</h2>
      <p>Window width: {windowWidth}</p>
      <Grid container spacing={1} justifyContent="center">
        <Grid
          container
          item
          xs={6}
          spacing={1}
          direction="column"
          alignItems="center"
        >
          {gettingSecretPhrase ? <h3>Selecting the secret phrase...</h3>: <h3>Secret phrase has been selected</h3>}
          {guessedCorrectly && <h3>You won!</h3>}
          {gameOver && !guessedCorrectly && <h3>No more guesses!</h3>}
          <div className="counter-holder">
            <p>Guesses remaining: {guessNumber} </p>
          </div>
          <div className="inputInfo">
            <div className="inputHolder">
              <TextField
                id="filled-basic"
                label="Guess the phrase"
                variant="outlined"
                onChange={guessInputChangeHandler}
                value={guessInput}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={guessSubmitHandler}
                disabled={gameOver || gettingSecretPhrase}
              >
                Submit Guess
              </Button>
            </div>
          </div>
          <div className="inputHolder">
            <p>Guesses so far...</p>
            {previousGuesses.length > 0 && (
              <ul>
                {previousGuesses.map((guess) => (
                  <li key={Math.random()}>{guess}</li>
                ))}
              </ul>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default FunctionalComponent;
