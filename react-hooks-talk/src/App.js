import React, { Component } from 'react';
import './App.css';
import ClassComponent from './Components/ClassComponent';
import FunctionalComponent from './Components/FunctionalComponent';

class App extends Component {
  constructor() {
    super()
    this.state = {
      displayClassComponent: true,
      counter: 0,
      secondCounter: 0,
    }
  }
  incrementCounter = () => {
    this.setState({ counter: this.state.counter + 1 })
  }
  incrementSecondCounter = () => {
    this.setState({ secondCounter: this.state.secondCounter + 1 })
  }
  toggleDisplay = () => {
    this.setState({displayClassComponent: !this.state.displayClassComponent})
  }
  render () {
    return (
      <div className="App-header">
        <button type="button" onClick={this.toggleDisplay}>Toggle Components</button>
        <div className="buttonSection">
          <button type="button" onClick={this.incrementCounter}>Increment Counter</button>
          <button type="button" onClick={this.incrementSecondCounter}>Increment Second Counter</button>
        </div>
        {this.state.displayClassComponent ? 
          <ClassComponent counter={this.state.counter} secondCounter={this.state.secondCounter}/> :
          <FunctionalComponent counter={this.state.counter} secondCounter={this.state.secondCounter}/>}
      </div>
    );
  }
}

export default App;
