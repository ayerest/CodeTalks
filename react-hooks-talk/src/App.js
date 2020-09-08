import React, { Component } from 'react';
import './App.css';
import ClassComponent from './Components/ClassComponent';
import FunctionalComponent from './Components/FunctionalComponent';
import { connect } from 'react-redux';
import Switch from "@material-ui/core/Switch";

class App extends Component {
  constructor() {
    super()
    this.state = {
      displayClassComponent: true,
    }
  }
  
  toggleDisplay = () => {
    this.setState({displayClassComponent: !this.state.displayClassComponent})
  }

  render () {
    return (
      <div className="App">
        <div className="toggle-switch">
          <p>Toggle Components</p>
          <Switch
            checked={this.state.displayClassComponent}
            onChange={this.toggleDisplay}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
        <div className="App-header">
          {this.state.displayClassComponent ? (
            <ClassComponent
              counter={this.props.counter}
              secondCounter={this.props.secondCounter}
              incrementCounter={this.props.incrementCounter}
              incrementSecondCounter={this.props.incrementSecondCounter}
            />
          ) : (
            <FunctionalComponent
              counter={this.props.counter}
              secondCounter={this.props.secondCounter}
              incrementCounter={this.props.incrementCounter}
              incrementSecondCounter={this.props.incrementSecondCounter}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
    secondCounter: state.secondCounter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    incrementCounter: () => dispatch({type: 'INCREMENT'}),
    incrementSecondCounter: () => dispatch({type: 'INCREMENT2'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
