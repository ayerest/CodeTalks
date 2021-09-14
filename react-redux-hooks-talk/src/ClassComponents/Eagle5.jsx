import React, { Component } from 'react';
import { connect } from 'react-redux'

class Eagle5 extends Component {
  jamRadar = () => {
    this.props.jamRadar();
  }
  render() {
    return (
      <button onClick={this.jamRadar}>Jam Radar</button>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    jamRadar: () => dispatch({ type: 'Jam', payload: 'Raspberry' }),
  }
}

export default connect(null, mapDispatchToProps)(Eagle5);