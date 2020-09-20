import React, { Component } from "react";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

class BookShelves extends Component {
  componentDidMount() {
    console.log("book shelves mounted");
  }

  componentDidUpdate() {
    console.log("book shelves updated");
  }

  componentWillUnmount() {
    console.log("book shelves unmounted");
  }

  render() {
    return (
      <div>
        <h2>My Books</h2>
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.class.myBooks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // resetGame: () => dispatch({ type: "RESET" }),
    // checkGuess: (guess) => dispatch({ type: "CHECKGUESS", payload: guess }),
    // selectPhrase: () => dispatch({type: "SELECTPHRASE"}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookShelves);