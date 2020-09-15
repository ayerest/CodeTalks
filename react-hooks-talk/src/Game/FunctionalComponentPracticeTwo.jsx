import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const FunctionalComponent = () => {
    
    const [guessInput, setGuessInput] = useState('');
    const [previousGuesses, setPreviousGuesses] = useState([]);
    const [checkingGuess, setCheckingGuess] = useState(false);

    const dispatch = useDispatch();

    const guessNumber = useSelector((state) => state.guessNumber);
    const gameOver = useSelector((state) => state.gameOver);
    const guessedCorrectly = useSelector((state) => state.guessedCorrectly);
    const secretPhrase = useSelector((state) => state.secretWord);

    useEffect(() => {
      console.log("use effect");
      setCheckingGuess(true);
      const timer = setTimeout(() => {
        dispatch({type: 'SELECTPHRASE'})
        setCheckingGuess(false);
      }, 2000)
      return () => {
          console.log("use effect clean up function")
          clearTimeout(timer);
      }
    }, [dispatch])

    useEffect(() => {
        console.log("use effect with dispatch to reset game")
        console.log(secretPhrase)
        dispatch({type: 'RESET'});
    }, [dispatch, secretPhrase])

    const guessInputChangeHandler = (e) => {
        setGuessInput(e.target.value);
    }

    const guessSubmitHandler = () => {  
      dispatch({type: 'CHECKGUESS', payload: guessInput});
      setPreviousGuesses((prevState) => [...prevState, guessInput]);
      setGuessInput('');
    }

    return (
      <div className="component">
        <h2>Functional Component</h2>
        {checkingGuess && <h3>Selecting the secret phrase...</h3>}
        {!checkingGuess && <h3>Secret phrase has been selected</h3>}
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
              disabled={gameOver || checkingGuess}
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
  }

export default FunctionalComponent;