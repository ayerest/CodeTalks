import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


const FunctionalComponent = (props) => {

  const [guessInput, setGuessInput] = useState("");
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [selectingPhrase, setSelectingPhrase] = useState(true);


  const guessNumber = useSelector((state) => state.guessNumber);
  const gameOver = useSelector((state) => state.gameOver);
  const guessedCorrectly = useSelector((state) => state.guessedCorrectly);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch action to select phrase
  })

  useEffect(() => {
    // dispatch action to reset game
  })

  const guessInputChangeHandler = (e) => {
  };

  const guessSubmitHandler = () => {
    // dispatch 'CHECKGUESS' action to the redux store
  };

  return (
    <div className="component">
      <h2>Functional Component</h2>
      {/* {selectingPhrase && <h3>Selecting the secret phrase...</h3>}
      {!selectingPhrase && <h3>Secret phrase has been selected</h3>} */}
      {/* {gameOver && guessedCorrectly && <h3>You won!</h3>}
      {gameOver && !guessedCorrectly && <h3>No more guesses! See you later boy!</h3>} */}
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
          />
          <Button
            variant="contained"
            color="primary"
            onClick={guessSubmitHandler}
            disabled={gameOver}
          >
            Submit Guess
          </Button>
        </div>
      </div>
      <div className="inputHolder">
        <p>Guesses so far...</p>
        {/* {previousGuesses.length > 0 && 
          <ul>
              {previousGuesses.map((guess) => <li key={Math.random()}>{guess}</li>)}
          </ul>
        } */}
      </div>
    </div>
  );
};

export default FunctionalComponent;