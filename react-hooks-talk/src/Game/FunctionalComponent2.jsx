import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useCustomHook = () => {
  const [gettingSecretPhrase, setGettingSecretPhrase] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch({ type: "SELECTPHRASEFUNCTIONAL" });
      setGettingSecretPhrase(false);
    }, 2000);
    return () => {
      clearTimeout(delay);
    };
  }, []);
  return gettingSecretPhrase;
}

const FunctionalComponent = () => {
  const gettingSecretPhrase = useCustomHook();
  const [guessInput, setGuessInput] = useState("guess");
  const [previousGuesses, setPreviousGuesses] = useState([]);

  // these values need to be retrieved redux store
  const guessedCorrectly = useSelector(state => state.functional.guessedCorrectly);
  const gameOver = useSelector((state) => state.functional.gameOver);
  const guessNumber = useSelector((state) => state.functional.guessNumber);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = guessInput;
  });

  useEffect(() => {
    // dispatch to redux store
    dispatch({type: 'RESETFUNCTIONAL'})
  }, [dispatch]);

  const guessInputChangeHandler = (e) => {
    setGuessInput(e.target.value);
  };

  const guessSubmitHandler = () => {
    // dispatch 'CHECKGUESS' action to the redux store
    setPreviousGuesses(prevState => [...prevState, guessInput]);
    dispatch({type: 'CHECKGUESSFUNCTIONAL', payload: guessInput});
  };
  
  return (
    <div className="component">
      <h2>Functional Component</h2>
      {gettingSecretPhrase && (
        <h3>Selecting the secret phrase...</h3>
      )}
      {!gettingSecretPhrase && (
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
    </div>
  );
};

export default FunctionalComponent;