import React, { Component } from 'react';

class ClassComponent extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
  }
  componentDidMount() {
    console.log("class component did mount")
  }

  componentWillUnmount() {
    console.log("class component will unmount")
  }
  inputChangeHandler = (e) => {
    this.setState({name: e.target.value})
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.name} onChange={this.inputChangeHandler} />
      </div>
    )
  }
}

export default ClassComponent;