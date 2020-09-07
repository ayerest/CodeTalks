import React, { Component } from 'react';

class ClassComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputField: '',
      secondInputField: '',
    }
  }

  componentDidMount() {
    console.log("component did mount");
    this.timer = setTimeout(() => {
      this.setState({inputField: 'Time out'})
    }, 2000)
  }

  componentWillUnmount() {
    console.log("component will unmount");
    clearTimeout(this.timer);
  }

  componentDidUpdate() {
    console.log("component did update");
  }

  shouldComponentUpdate() {
    // if (this.props.secondCounter % 3 === 0) {
    //   return true;
    // }
    // return false;
    return true;
  }

  inputFieldChangeHandler = (e) => {
    this.setState({inputField: e.target.value})
  }

  secondInputFieldChangeHandler = (e) => {
    this.setState({secondInputField: e.target.value})
  }

  render() {
    return (
      <div className="component">
        <h2>Class Component</h2>
        <p>Counter: {this.props.counter}</p>
        <p>SecondCounter: {this.props.secondCounter}</p>
        <input type="text" placeholder="Enter text here" value={this.state.inputField} onChange={this.inputFieldChangeHandler}/>
        <input type="text" placeholder="Enter text here" value={this.state.secondInputField} onChange={this.secondInputFieldChangeHandler}/>
        <ul>
          <li>{this.state.inputField}</li>
          <li>{this.state.secondInputField}</li>
        </ul>
      </div>
    )
  }
}

export default ClassComponent;