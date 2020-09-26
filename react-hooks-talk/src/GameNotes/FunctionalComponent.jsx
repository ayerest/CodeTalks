import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../GameStore/Actions/FunctionalActions';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

const useOtherCustomHook = () => {
  const [randomBook, setRandomBook] = useState(null);
  const authors = useSelector((state) => state.functional.authors);
  // only runs on load because setFunction is stable and authors won't change
  useEffect(() => {
    const controller = new AbortController();
    const getRandomBook = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=inauthor:${
            authors[Math.floor(Math.random() * authors.length)]
          }&printType=books&projection=lite&orderBy=relevance&maxResults=1&startIndex=0&fields=items(selfLink,volumeInfo(title,authors,description,imageLinks))`,
          {
            signal: controller.signal,
          }
        );
        const data = await response.json();
        setRandomBook(data.items[0]);
      } catch (error) {
        console.log(error.message);
      }
    };
    getRandomBook();
    return () => {
      controller.abort();
    };
  }, [authors, setRandomBook]);
  return randomBook;
};

const useCustomHookName = () => {
  const dispatch = useDispatch();
  const [gettingSecretPhrase, setGettingSecretPhrase] = useState(true);
  // only runs when component is mounted (dispatch and setGettingSecretPhrase are stable aka won't change)
  useEffect(() => {
    console.log("use effect");
    // dispatch action to select secret phrase
    const timer = setTimeout(() => {
      dispatch(actions.selectPhrase());
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
  const randomBook = useOtherCustomHook();
  const gettingSecretPhrase = useCustomHookName();
  const guessedCorrectly = useSelector(
    (state) => state.functional.guessedCorrectly
  );
  const gameOver = useSelector((state) => state.functional.gameOver);
  const guessNumber = useSelector((state) => state.functional.guessNumber);

  const dispatch = useDispatch();

  // runs on every update
  useEffect(() => {
    document.title = guessInput;
  });

  // only runs when component is mounted because dispatch is stable
  useEffect(() => {
    dispatch(actions.reset());
  }, [dispatch]);

  const guessInputChangeHandler = (e) => {
    setGuessInput(e.target.value);
  };

  const guessSubmitHandler = () => {
    // add guess to previous guesses list, dispatch redux store, reset guess input
    setPreviousGuesses((prevState) => [...prevState, guessInput]);
    dispatch(actions.checkGuess(guessInput));
    setGuessInput("");
  };

  return (
    <div className="component">
      <h2>Functional Component</h2>
      <Grid container spacing={2} justify="center">
        <Grid
          container
          item
          xs={6}
          spacing={1}
          direction="column"
          alignItems="center"
        >
          <h3>Book of the Day</h3>
          <List>
            {randomBook && (
              <div className="bookInfo" key={randomBook.selfLink}>
                <img
                  src={randomBook.volumeInfo.imageLinks.thumbnail}
                  alt={randomBook.volumeInfo.title}
                />
                <ListItemText
                  primary={randomBook.volumeInfo.title}
                  secondary={`by ${randomBook.volumeInfo.authors[0]}`}
                />
              </div>
            )}
          </List>
        </Grid>
        <Grid
          container
          item
          xs={6}
          spacing={1}
          direction="column"
          alignItems="center"
        >
          {gettingSecretPhrase && <h3>Selecting the secret phrase...</h3>}
          {!gettingSecretPhrase && <h3>Secret phrase has been selected</h3>}
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
