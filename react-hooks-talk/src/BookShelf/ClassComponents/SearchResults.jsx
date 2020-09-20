import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.searchResults)
  }
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
      <List>
        {this.props.searchResults.length > 0 &&
          this.props.searchResults.map((book) => (
            <ListItem key={book.selfLink}>
              <ListItemText
                primary={book.volumeInfo.title}
                secondary={`by ${book.volumeInfo.authors}`}
              />
              <ListItemAvatar>
                <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
              </ListItemAvatar>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    );
  }
}

export default SearchResults;
