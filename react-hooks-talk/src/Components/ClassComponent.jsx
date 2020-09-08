import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";


class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstInputField: "",
      secondInputField: "",
    };
  }

  componentDidMount() {
    console.log("Component did mount");
    this.timer = setTimeout(()=> {
      this.setState({secondInputField: 'Time out'})
    }, 2000)
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  componentDidUdate() {
    console.log("Component will update");
  }

  // shouldComponentUpdate(prevProps, nextState) {
  //   if (prevProps.counter % 3 === 0) {
  //     return false;
  //   }
  //   return true;
  // }

  firstInputFieldChangeHandler = (e) => {
    this.setState({ firstInputField: e.target.value });
  };

  secondInputFieldChangeHandler = (e) => {
    this.setState({ secondInputField: e.target.value })
  }

  render() {
    return (
      <div className="component class">
        <h2>Class Component</h2>
        <div className="counter-holder">
          <p>Counter: {this.props.counter}</p>
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={this.props.incrementCounter}
          >
            +
          </Button>
        </div>
        <div className="counter-holder">
          <p>Counter: {this.props.secondCounter}</p>
          <Button
            variant="contained"
            type="button"
            onClick={this.props.incrementSecondCounter}
          >
            +
          </Button>
        </div>
        <div className="inputInfo">
          <div className="inputHolder">
            <TextField
              id="filled-basic"
              label="Input 1"
              variant="outlined"
              value={this.state.firstInputField}
              onChange={this.firstInputFieldChangeHandler}
            />
            <TextField
              id="filled-basic"
              label="Input 2"
              variant="outlined"
              value={this.state.secondInputField}
              onChange={this.secondInputFieldChangeHandler}
            />
          </div>
          <div className="inputHolder">
            <p>First input: {this.state.firstInputField}</p>
            <p>Second input: {this.state.secondInputField}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ClassComponent;