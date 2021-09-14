import React, { Component } from "react";
import { connect } from 'react-redux';
import JammedRadar from '../images/jammed.jpg';
import Radar from '../images/mr-radar.png';

class MrRadar extends Component {
  render() {
    return (
      <img src={this.props.jammed ? JammedRadar  : Radar} alt="Radar screen" />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    jammed: state.jammed
  }
}

export default connect(mapStateToProps)(MrRadar);