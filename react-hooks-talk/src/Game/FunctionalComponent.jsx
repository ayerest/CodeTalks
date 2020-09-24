import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useCustomHookName = () => {
  const dispatch = useDispatch();
  const [gettingSecretPhrase, setGettingSecretPhrase] = useState(true);


  useEffect(() => {
    console.log("use effect");
    // dispatch action to select secret phrase
    const timer = setTimeout(() => {
      dispatch({ type: "SELECTPHRASEFUNCTIONAL" });
      setGettingSecretPhrase(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, setGettingSecretPhrase]);
  return gettingSecretPhrase;
};

const FunctionalComponent = (props) => {

  const [guessInput, setGuessInput] = useState('');
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const gettingSecretPhrase = useCustomHookName();
  const guessedCorrectly = useSelector(state => state.functional.guessedCorrectly);
  const gameOver = useSelector(state => state.functional.gameOver);
  const guessNumber = useSelector(state => state.functional.guessNumber);
  const dispatch = useDispatch();
  

  

  useEffect(() => {
   dispatch({ type: "RESETFUNCTIONAL" }); 
  }, [dispatch])
  

  const guessInputChangeHandler = (e) => {
    setGuessInput(e.target.value);
  }

  const guessSubmitHandler = () => {
    // dispatch redux store
    setPreviousGuesses(prevState => [...prevState, guessInput]);
    setGuessInput('');
    dispatch({ type: "CHECKGUESSFUNCTIONAL", payload: guessInput });
  }

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