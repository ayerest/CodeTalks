import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import Switch from "@material-ui/core/Switch";

const FunctionalComponentsContainer = () => {
  let searchDelay;
  const [searchInput, setSearchInput] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [newBookShelf, setNewBookShelf] = useState([]);
  const [showMyBookShelves, setShowMyBookShelves] = useState(false);
  // TODO: move to redux store
  const [authors, setAuthors] = useState(
    [
      "John Steinbeck",
      "Jane Austen",
      "Raymond Chandler",
      "N.K. Jemisin",
      "Maya Angelou",
      "Charlotte Bronte",
      "Mary Shelley"
    ]
  );
  const [randomBook, setRandomBook] = useState(null);
  
  useEffect(() => {
    // call when component mounts
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
  }, [authors]);

  useEffect(() => {
    console.log("use effect");
    return () => {
      clearTimeout(searchDelay);
    }
    // don't forget to include the dependency
  }, [searchDelay])

  const shelves = useSelector(state => state.functional.myBooks);
  const dispatch = useDispatch();

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  }

  const searchForBooks = () => {
    // fetch request to google books api
    setSearching(true);
    searchDelay = setTimeout(() => {
      fetch(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:${searchInput}&printType=books&projection=lite&orderBy=relevance&maxResults=10&startIndex=0&fields=items(selfLink,volumeInfo(title,authors,description,imageLinks))`
      )
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.items);
        setSearching(false);
      });
    }, 2000);
  }

  const addToTempShelf = (book) => {
    setNewBookShelf(prevState => [...prevState, book]);
    // TODO: add input field to name shelf
  }
  
  const saveShelf = () => {
    // dispatch action to redux store to create new shelf
    dispatch({type: 'CREATESHELF', payload: {New: newBookShelf}})
  }

  const toggleShelves = () => {
    setShowMyBookShelves(prevState => !prevState);
  }

  return (
    <div>
      <h1>Functional Component</h1>
      <Grid container spacing={2} direction="row">
        <Grid container item spacing={1} direction="column">
          <h2>Book of the Day</h2>
          <List>
            {randomBook && (
              <div key={randomBook.selfLink}>
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
        <Grid container item spacing={1} direction="column">
          <TextField
            id="filled-basic"
            label="Search by Author"
            variant="outlined"
            onChange={searchInputHandler}
            value={searchInput}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={searchForBooks}
            disabled={searching}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {newBookShelf.length > 0 && (
          <Grid container item spacing={1} direction="column">
            <h2>New Book Shelf</h2>
            <List>
              {newBookShelf.map((book) => (
                <ListItem key={book.selfLink}>
                  <ListItemText
                    primary={book.volumeInfo.title}
                    secondary={`by ${book.volumeInfo.authors}`}
                  />
                  <ListItemAvatar>
                    <img
                      src={book.volumeInfo.imageLinks.thumbnail}
                      alt={book.volumeInfo.title}
                    />
                  </ListItemAvatar>
                </ListItem>
              ))}
              <IconButton edge="end" aria-label="delete" onClick={saveShelf}>
                <SaveIcon />
              </IconButton>
            </List>
          </Grid>
        )}
        {searchResults.length > 0 && (
          <Grid container item spacing={1} direction="column">
            <h2>Search Results</h2>
            <List>
              {searchResults.map((book) => (
                <ListItem key={book.selfLink}>
                  <ListItemText
                    primary={book.volumeInfo.title}
                    secondary={`by ${book.volumeInfo.authors}`}
                  />
                  <ListItemAvatar>
                    <img
                      src={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail}
                      alt={book.volumeInfo.title}
                    />
                  </ListItemAvatar>
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="add"
                      onClick={() => addToTempShelf(book)}
                    >
                      <AddIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={2} alignItems="center">
        <h2>Show My Bookshelves</h2>
        <Switch
          checked={showMyBookShelves}
          onChange={toggleShelves}
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Grid>
      {showMyBookShelves && (
        <Grid container spacing={1} direction="column">
          <div>
            <h2>My BookShelves</h2>
            {shelves &&
              shelves.map((shelf) => {
                return (
                  <List key={Math.random()}>
                    <h2>{Object.keys(shelf)[0].toString()}</h2>
                    {shelf[Object.keys(shelf)[0]].map((book) => (
                      <ListItem key={book.volumeInfo.imageLinks.thumbnail}>
                        <ListItemText
                          primary={book.volumeInfo.title}
                          secondary={`by ${book.volumeInfo.authors}`}
                        />
                        <ListItemAvatar>
                          <img
                            src={book.volumeInfo.imageLinks.thumbnail}
                            alt={book.volumeInfo.title}
                          />
                        </ListItemAvatar>
                      </ListItem>
                    ))}
                  </List>
                );
              })}
          </div>
        </Grid>
      )}
    </div>
  );
};

export default FunctionalComponentsContainer;