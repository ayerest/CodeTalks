import React, { Component } from 'react';

class ClassComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputField: '',
    }
  }

  componentDidMount() {
    console.log("class component is mounted")
    this.timer = setTimeout(() => {
      this.setState({inputField: 'Time out'})
    }, 2000)
    // perform another unrelated task here...
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  inputFieldChangeHandler = (e) => {
    this.setState({inputField: e.target.value});
  }

  render() {
    return (
      <div className="component">
        <h2>Class Component</h2>
        <p>Counter: {this.props.counter}</p>
        <p>SecondCounter: {this.props.secondCounter}</p>
        <input type="text" placeholder="Enter text here" value={this.state.inputField} onChange={this.inputFieldChangeHandler}/>
        <p>{this.state.inputField}</p>
      </div>
    )
  }
}

export default ClassComponent;