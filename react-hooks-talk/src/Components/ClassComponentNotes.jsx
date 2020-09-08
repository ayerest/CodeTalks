import React, { Component } from 'react';

class ClassComponent extends Component {
  constructor(props) {
    super(props)
    // Step 1: Add state in the constructor
    this.state = {
      name: ''
    }
  }
  // Step 2: Add side effect in the lifecycle methods
  componentDidMount() {
    // Step 2a: setTimeout that alters state will cause a memory leak
    // Step 3a: console.log to demonstrate render number
    console.log("class component did mount");
    this.timer = setTimeout(() => {
      this.setState({ name: 'Time out' })
    }, 1000)
  }
  componentWillUnmount() {
    console.log("class component will unmount")
    // Step 2b: clean up the setTimeout here to solve the memory leak issue
    clearTimeout(this.timer);
  }

  // step 3a: only render if the counter is even
  // TODO: need a better example here - not clear enough, add componentDidUpdate
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.counter % 2 === 0) {
      return true;
    }
    return false;
  }

  inputChangeHandler = (e) => {
    this.setState({name: e.target.value})
  }

  // TODO: update to reflect most recent changes
  render() {
    return (
      <div className="component">
        <h2>Class Component</h2>
        <p>Counter: {this.props.counter}</p>
        <input type="text" value={this.state.name} onChange={this.inputChangeHandler} />
      </div>
    )
  }
}

export default ClassComponent;