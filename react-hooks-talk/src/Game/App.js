import React, { Component } from "react";
import Switch from "@material-ui/core/Switch";
import Container from "@material-ui/core/Container";
// import ClassComponent from "../GameNotes/ClassComponent";
// import FunctionalComponent from "../GameNotes/FunctionalComponent";
import FunctionalComponent from "./FunctionalComponent";
import ClassComponent from './ClassComponent';

import '../App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      displayClassComponent: false,
    };
  }

  toggleDisplay = () => {
    this.setState({ displayClassComponent: !this.state.displayClassComponent });
  };

  render() {
    return (
      <Container>
          <p>Toggle Components</p>
          <Switch
            checked={this.state.displayClassComponent}
            onChange={this.toggleDisplay}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <Container>
            {this.state.displayClassComponent && <ClassComponent />}
            {!this.state.displayClassComponent && <FunctionalComponent />}
          </Container>
      </Container>
    );
  }
}

export default App;
