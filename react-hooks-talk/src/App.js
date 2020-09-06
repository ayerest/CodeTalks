import React, { Component } from 'react';
import './App.css';
import ClassComponent from './Components/ClassComponent';
import FunctionalComponent from './Components/FunctionalComponent';

class App extends Component {
  constructor() {
    super()
    this.state = {
      displayClassComponent: true,
    }
  }
  toggleDisplay = () => {
    console.log(this.state)
    this.setState({displayClassComponent: !this.state.displayClassComponent})
  }
  render () {
    return (
      <div className="App-header">
        <button type="button" onClick={this.toggleDisplay}>Toggle Components</button>
        {this.state.displayClassComponent ? 
        <ClassComponent /> :
        <FunctionalComponent />}
      </div>
    );
  }
}

export default App;
