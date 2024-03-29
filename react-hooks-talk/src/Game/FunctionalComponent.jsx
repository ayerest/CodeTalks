import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../GameStore/Actions/FunctionalActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

const useCustomHook = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
    setWindowWidth(window.innerWidth);
  }
   useEffect(() => {
    console.log("window width");
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);
  return windowWidth;
}

const FunctionalComponent = () => {
  const [guessInput, setGuessInput] = useState('');
  const [loadingGame, setLoadingGame] = useState(true);
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const windowWidth = useCustomHook();
  const gameOver = useSelector(state => state.functional.gameOver);
  const guessNumber = useSelector(state => state.functional.guessNumber);
  const guessedCorrectly = useSelector(state => state.functional.guessedCorrectly);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(actions.reset());
      console.log("resetting");
    }
  }, [dispatch]);

  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(actions.load());
      setLoadingGame(false);
    }, 2000)
    return () => {
      clearTimeout(delay);
    }
  }, [dispatch]);

  useEffect(() => {
    console.log("document title update");
    document.title = guessInput;
  }, [guessInput]);

  const guessInputChangeHandler = (e) => {
    setGuessInput(e.target.value);
  }

  const guessSubmitHandler = () => {
    setPreviousGuesses(prevState => [...prevState, guessInput]);
    dispatch(actions.checkGuess(guessInput));
  }
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
        {loadingGame ? (
              <h3>Selecting the secret phrase...</h3>
            ) : (
              <h3>Secret phrase has been selected</h3>
            )}
            {guessedCorrectly && <h3>You won!</h3>}
            {gameOver && !guessedCorrectly && (
              <h3>No more guesses!</h3>
            )}
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
                  disabled={gameOver || loadingGame}
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