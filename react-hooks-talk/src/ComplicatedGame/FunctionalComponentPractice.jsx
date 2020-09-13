import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress"; 

const FunctionalComponent = (props) => {
    // guessInput: "",
    //   previousGuesses: [],
    //   checkingGuess: false,
    const [guessInput, setGuessInput] = useState('');
    const [previousGuesses, setPreviousGuesses] = useState([]);
    const [checkingGuess, setCheckingGuess] = useState(false);
    const dispatch = useDispatch();

    const guessNumber = useSelector((state) => state.guessNumber);
    const gameOver = useSelector((state) => state.gameOver);
    const guessedCorrectly = useSelector((state) => state.guessedCorrectly);
    let timer = null;

    useEffect(() => {
        return () => {
            // this is not ideal, runs with every update
            console.log("use effect clean up function");
            clearTimeout(timer);
        }
    }, [timer])

    useEffect(() => {
        console.log("use effect to reset the game")
        return () => {
            dispatch({type: 'RESET'});
        }
    }, [dispatch])

    const handleInputChange = (e) => {
        setGuessInput(e.target.value);
    }

    const handleGuessSubmission = () => {
        setCheckingGuess(true);
        timer = setTimeout(() => {
            dispatch({type: 'CHECKGUESS', payload: guessInput});
            setPreviousGuesses([...previousGuesses, guessInput])
            setGuessInput('');
            setCheckingGuess(false);
        }, 1000)
    }

    const handleResetGame = () => {
        dispatch({type: 'RESET'});
        setGuessInput('');
        setPreviousGuesses([]);
    }

    return (
        <div className="component class">
            <h2>Functional Component</h2>
            {checkingGuess && <CircularProgress />}
            {gameOver && !guessedCorrectly && <h3>Game Over!</h3>}
            {gameOver && guessedCorrectly && <h3>You Won!</h3>}
            <Button
            variant="contained"
            color="secondary"
            onClick={handleResetGame}
            >
                Reset Game
            </Button>
            <div className="counter-holder">
            <p>Guesses remaining: {guessNumber} </p>
            </div>
            <div className="inputInfo">
            <div className="inputHolder">
                <label>Guess the word!</label>
                <TextField
                id="filled-basic"
                label="Input 1"
                variant="outlined"
                value={guessInput}
                onChange={handleInputChange}
                />
                <Button
                variant="contained"
                color="primary"
                onClick={handleGuessSubmission}
                disabled={gameOver}
                >
                    submit guess
                </Button>
            </div>
            <div className="inputHolder">
                <p>Guesses so far...</p>
                <ul>
                    {previousGuesses && previousGuesses.map((guess) => <li key={Math.random()}>{guess}</li>)}
                </ul>
            </div>
            </div>
        </div>
    )
}

export default FunctionalComponent;