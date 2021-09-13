import React, { Component } from 'react';
import { connect } from 'react-redux';

class SpeedSelector extends Component {
  changeSpeedHandler = (e) => {
    console.log(e.target.value, "class")
    this.props.changeSpeed(e.target.value);
  }
  // TODO: change to buttons styled like the movie
  render() {
    return (
      <div className="selector">
        <label>Choose a speed:</label>
  
        <select name="speed" id="speed-select" onChange={this.changeSpeedHandler}>
          <option value="">--Please choose an option--</option>
          <option value="Light">Light</option>
          <option value="Ridiculous">Ridiculous</option>
          <option value="Ludicrous">Ludicrous</option>
        </select>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeSpeed: (speed) => dispatch({ type: speed }),
  }
}

export default connect(null, mapDispatchToProps)(SpeedSelector);