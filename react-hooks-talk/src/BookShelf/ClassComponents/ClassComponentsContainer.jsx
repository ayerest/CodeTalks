import React, { Component } from 'react';
import SearchForm from './SearchForm';
import BookShelves from './BookShelves';
import SearchResults from './SearchResults';
import { Grid } from '@material-ui/core';

class ClassComponentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
    }
  }

  componentDidMount() {
    console.log("container mounted");
  };
  
  componentDidUpdate() {
    console.log("container updated");
  }

  componentWillUnmount() {
    console.log("container unmounted");
  }

  searchForBooks = () => {
    // "https://www.googleapis.com/books/v1/volumes?q=jemisin&printType=books&projection=lite&orderBy=relevance&maxResults=3&startIndex=0&fields=items(selfLink,volumeInfo(title,authors,description))";
    fetch(
      "https://www.googleapis.com/books/v1/volumes?q=jemisin&printType=books&projection=lite&orderBy=relevance&maxResults=5&startIndex=0&fields=items(selfLink,volumeInfo(title,authors,description,imageLinks))"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({searchResults: data.items});
      });
  }


  render() {
    return (
      <div>
        <h1>Class Component</h1>
        <SearchForm searchForBooks={this.searchForBooks} />
        <Grid container spacing={2}>
          <SearchResults searchResults={this.state.searchResults} />
          <BookShelves />
        </Grid>
      </div>
    );
  }
};

export default ClassComponentsContainer;