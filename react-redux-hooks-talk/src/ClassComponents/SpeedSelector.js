import React, { Component } from 'react';
import { connect } from 'react-redux';

class SpeedSelector extends Component {
  changeSpeedHandler = (e) => {
    this.props.changeSpeed(e.target.value);
  }
  render() {
    return (
      <div className="selector">
        <button className={`light speedControl ${this.props.speed !== 'light' ? 'notSelected' : null}`} onClick={this.changeSpeedHandler} value="Light">LIGHT SPEED</button>
      <button className={`ridiculous speedControl ${this.props.speed !== 'ridiculous' ? 'notSelected' : null}`} onClick={this.changeSpeedHandler} value="Ridiculous">RIDICULOUS SPEED</button>
      <button className={`ludicrous speedControl ${this.props.speed !== 'ludicrous' ? 'notSelected' : null}`} onClick={this.changeSpeedHandler} value="Ludicrous">LUDICROUS SPEED</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeSpeed: (speed) => dispatch({ type: speed }),
  }
}

const mapStateToProps = (state) => {
  return {
    speed: state.speed,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpeedSelector);