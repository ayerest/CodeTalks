import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as actions from '../GameStore/Actions/FunctionalActions';

const useCustomHook = () => {
  const [selectingPhrase, setSelectingPhrase] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("use effect");
    const delay = setTimeout(() => {
      //  dispatch action to select new secret phrase
      dispatch(actions.selectPhrase());
      setSelectingPhrase(false);
    }, 2000);
    return () => {
      clearTimeout(delay);
    };
  });
  return selectingPhrase;
};

const FunctionalComponent = (props) => {
  const [guessInput, setGuessInput] = useState("");
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const selectingPhrase = useCustomHook();

  const guessNumber = useSelector((state) => state.functional.guessNumber);
  const gameOver = useSelector((state) => state.functional.gameOver);
  const guessedCorrectly = useSelector((state) => state.functional.guessedCorrectly);

  const dispatch = useDispatch();

  // TODO: need to set up this useEffect early on

  // useEffect(() => {
  //  console.log("use effect");
  //  const delay = setTimeout(() => {
  //     //  dispatch action to select new secret phrase
  //     dispatch({type: 'SELECTPHRASE'});
  //     setSelectingPhrase(false);
  //  }, 2000)
  //  return () => {
  //    clearTimeout(delay);
  //  }
  // })

  useEffect(() => {
    console.log("second use effect");
    // dispatch to reset game when component is mounted
    dispatch(actions.reset());
    // TODO: why is dispatch needed as a dependency
  }, [dispatch]);

  const guessInputChangeHandler = (e) => {
    setGuessInput(e.target.value);
  };

  const guessSubmitHandler = () => {
    // dispatch 'CHECKGUESS' action to the redux store
    dispatch(actions.checkGuess(guessInput));
    // TODO: do I need to access prevState like this?
    setPreviousGuesses((prevState) => [...prevState, guessInput]);
    setGuessInput("");
  };

  return (
    <div className="component">
      <h2>Functional Component</h2>
      {selectingPhrase && <h3>Selecting the secret phrase...</h3>}
      {!selectingPhrase && <h3>Secret phrase has been selected</h3>}
      {gameOver && guessedCorrectly && <h3>You won!</h3>}
      {gameOver && !guessedCorrectly && (
        <h3>No more guesses! See you later boy!</h3>
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
            value={guessInput}
            onChange={guessInputChangeHandler}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={guessSubmitHandler}
            disabled={gameOver || selectingPhrase}
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
