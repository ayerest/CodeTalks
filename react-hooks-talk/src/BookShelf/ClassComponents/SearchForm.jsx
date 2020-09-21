import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
    }
  }
  componentDidMount() {
    console.log("search form mounted");
  }

  componentDidUpdate() {
    console.log("search form updated");
  }

  componentWillUnmount() {
    console.log("search form unmounted");
    clearTimeout(this.searchDelay);
  }

  searchInputHandler = (e) => {};

  searchSubmitHandler = () => {
    this.setState({searching: true})
    this.searchDelay = setTimeout(() => {
      this.props.searchForBooks();
      this.setState({searching: false});
    }, 2000)
  };

  render() {
    return (
      <div className="inputHolder">
        <TextField
          id="filled-basic"
          label="Search for books"
          variant="outlined"
          onChange={this.searchInputHandler}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.searchSubmitHandler}
          disabled={this.state.searching}
        >
          Search
        </Button>
      </div>
    );
  }
}

export default SearchForm;
