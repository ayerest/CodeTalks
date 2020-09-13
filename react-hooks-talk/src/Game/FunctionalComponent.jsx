import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const FunctionalComponent = () => {
    const [guessInput, setGuessInput] = useState('');
    const [previousGuesses, setPreviousGuesses] = useState([]);
    const [checkingGuess, setCheckingGuess] = useState(false);
    let timer = null;

    const dispatch = useDispatch();
    const guessNumber = useSelector(state => state.guessNumber);
    const gameOver = useSelector(state => state.gameOver);
    const guessedCorrectly = useSelector(state => state.guessedCorrectly);

    useEffect(() => {
        return () => {
            console.log("use effect clean up function");
            clearTimeout(timer);
        }
        // including setGuessInput keeps this from running every time the input is altered
    }, [setGuessInput, timer])

    useEffect(() => {
        // run this every time the component is mounted, but not for render updates
        dispatch({type: 'RESET'})
    }, [dispatch])


    const handleResetGame = () => {
        setGuessInput('');
        setPreviousGuesses([]);
        return dispatch({type: 'RESET'})
    }

    const handleGuessInputChange = (e) => {
        setGuessInput(e.target.value);
    };

    const handleGuessSubmission = () => {
        setCheckingGuess(true);
        timer = setTimeout(() => {
            dispatch({type: 'CHECKGUESS', payload: guessInput});
            setPreviousGuesses(() => [...previousGuesses, guessInput]);
            setGuessInput('');
            setCheckingGuess(false);
        }, 1000)
    }

    return (
      <div className="component">
        <h2>Functional Component</h2>
        {checkingGuess && <CircularProgress />}
        {guessedCorrectly && <h3>You won!</h3>}
        {!guessedCorrectly && gameOver && <h3>Game Over!</h3>}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleResetGame}
        >
          Reset Game
        </Button>
        <div className="counter-holder">
          <p>Guesses remaining: {guessNumber}</p>
        </div>
        <div className="inputInfo">
          <div className="inputHolder">
            <TextField
              id="filled-basic"
              label="Guess the phrase"
              variant="outlined"
              value={guessInput}
              onChange={handleGuessInputChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleGuessSubmission}
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
                    {previousGuesses && previousGuesses.map((guess) => <li key={Math.random()}>{guess}</li>)}
                </ul>
            }
        </div>
      </div>
    );
  }

export default FunctionalComponent;