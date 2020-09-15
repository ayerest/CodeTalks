import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useCustomHook = () => {
  const [selectingPhrase, setSelectingPhrase] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch({ type: "SELECTPHRASE" });
      setSelectingPhrase(false);
    }, 2000);
    return () => {
      clearTimeout(delay);
    };
  });
  return selectingPhrase;
}

const FunctionalComponent = (props) => {

  const [guessInput, setGuessInput] = useState('');
  const [previousGuesses, setPreviousGuesses] = useState([]);

  const selectingPhrase = useCustomHook();

  const guessNumber = useSelector((state) => state.guessNumber);
  const gameOver = useSelector((state) => state.gameOver);
  const guessedCorrectly = useSelector((state) => state.guessedCorrectly);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'RESET'});
  }, [dispatch])

  const guessInputChangeHandler = (e) => {
    setGuessInput(e.target.value);
  };

  const guessSubmitHandler = () => {
    // dispatch 'CHECKGUESS' action to the redux store
    dispatch({type: 'CHECKGUESS', payload: guessInput})
    setPreviousGuesses([...previousGuesses, guessInput])
    setGuessInput('');
  };

  return (
    <div className="component">
      <h2>Functional Component</h2>
      {selectingPhrase && <h3>Selecting the secret phrase...</h3>}
      {!selectingPhrase && <h3>Secret phrase has been selected</h3>}
      {gameOver && guessedCorrectly && <h3>You won!</h3>}
      {gameOver && !guessedCorrectly && <h3>No more guesses! See you later boy!</h3>}
      <div className="counter-holder">
        <p>Guesses remaining: {guessNumber} </p>
      </div>
      <div className="inputInfo">
        <div className="inputHolder">
          <TextField
            id="filled-basic"
            label="Guess the phrase"
            variant="outlined"
            value={guessInput}
            onChange={guessInputChangeHandler}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={guessSubmitHandler}
            disabled={selectingPhrase || gameOver}
          >
            Submit Guess
          </Button>
        </div>
      </div>
      <div className="inputHolder">
        <p>Guesses so far...</p>
        {previousGuesses.length > 0 && 
          <ul>
              {previousGuesses.map((guess) => <li key={Math.random()}>{guess}</li>)}
          </ul>
        }
      </div>
    </div>
  );
};

export default FunctionalComponent;