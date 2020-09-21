import React, { Component } from 'react';
import { connect } from "react-redux";
import { Grid } from '@material-ui/core';
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
// import Container from "@material-ui/core/Container";

class ClassComponentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      searching: false,
      searchInput: "",
      newBookShelf: [],
      authors: [
        "John Steinbeck",
        "Jane Austen",
        "Raymond Chandler",
        "N.K. Jemisin",
        "Maya Angelou",
        "Charlotte Bronte",
        "Mary Shelley",
      ],
      randomBook: null,
      showMyBookShelves: false,
    };
  }

  controller = new AbortController();

  componentDidMount() {
    console.log("component mounted");
    // load a random book from api
    this.getRandomBook();
  }

  componentDidUpdate() {
    console.log("component updated");
  }

  componentWillUnmount() {
    console.log("component unmounted");
    clearTimeout(this.searchDelay);
    this.controller.abort();
  }

  searchInputHandler = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  getRandomBook = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=inauthor:${
          this.state.authors[
            Math.floor(Math.random() * this.state.authors.length)
          ]
        }&printType=books&projection=lite&orderBy=relevance&maxResults=1&startIndex=0&fields=items(selfLink,volumeInfo(title,authors,description,imageLinks))`,
        {
          signal: this.controller.signal,
        }
      );
      const data = await response.json();
      this.setState({ randomBook: data.items[0] });
    } catch (error) {
      console.log(error.message);
    }
  };

  searchForBooks = () => {
    this.setState({ searching: true });
    this.searchDelay = setTimeout(() => {
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=inauthor:${this.state.searchInput}&printType=books&projection=lite&orderBy=relevance&maxResults=5&startIndex=0&fields=items(selfLink,volumeInfo(title,authors,description,imageLinks))`
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({ searchResults: data.items });
        });
      this.setState({ searching: false });
    }, 2000);
  };

  addToTempShelf = (book) => {
    this.setState((state) => ({
      newBookShelf: [...state.newBookShelf, book],
    }));
  };

  saveShelf = () => {
    const list = this.state.newBookShelf;
    this.props.createList(list);
  };

  toggleShelves = () => {
    this.setState((state) => ({
      showMyBookShelves: !state.showMyBookShelves,
    }));
  }

  render() {
    return (
      <div>
        <h1>Class Component</h1>
        <Grid container spacing={2} direction="row">
          <Grid container item spacing={1} direction="column">
            <h2>Book of the Day</h2>
            <List>
              {this.state.randomBook && (
                <div key={this.state.randomBook.selfLink}>
                  <img
                    src={this.state.randomBook.volumeInfo.imageLinks.thumbnail}
                    alt={this.state.randomBook.volumeInfo.title}
                  />
                  <ListItemText
                    primary={this.state.randomBook.volumeInfo.title}
                    secondary={`by ${this.state.randomBook.volumeInfo.authors[0]}`}
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
              onChange={this.searchInputHandler}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.searchForBooks}
              disabled={this.state.searching}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {this.state.searchResults.length > 0 &&
            <Grid container item spacing={1} direction="column">
              <h2>Search Results</h2>
              <List>
                {this.state.searchResults.map((book) => (
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
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => this.addToTempShelf(book)}
                      >
                        <AddIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          }
          {this.state.newBookShelf.length > 0 && (
          <Grid container item spacing={1} direction="column">
            <h2>New Book Shelf</h2>
              <List>
                {this.state.newBookShelf.map((book) => 
                  (<ListItem key={book.selfLink}>
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
                    </ListItem>)
                )}
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={this.saveShelf}
                >
                  <SaveIcon />
                </IconButton>
              </List>
            </Grid>
            )}
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <h2>Show My Bookshelves</h2>
          <Switch
            checked={this.state.showMyBookShelves}
            onChange={this.toggleShelves}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </Grid>
        {this.state.showMyBookShelves && (
          <Grid container spacing={1} direction="column">
            <div>
              <h2>My BookShelves</h2>
              <List>
                {this.props.books &&
                  this.props.books.map((book) => (
                    <ListItem key={book.image}>
                      <ListItemText
                        primary={book.title}
                        secondary={`by ${book.authors[0]}`}
                      />
                      <ListItemAvatar>
                        <img src={book.image} alt={book.title} />
                      </ListItemAvatar>
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
              </List>
            </div>
          </Grid>
        )}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    books: state.class.myBooks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createList: (list) => dispatch({type: 'CREATELIST', payload: list})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassComponentsContainer);