import React, { Component } from 'react';
import { connect } from 'react-redux';
// import EngineSpeed from '../EngineSpeed/EngineSpeed';
import ludicrous from '../images/ludicrousspeed.jpg';
import light from '../images/light-speed.jpg';
import ridiculous from '../images/ridiculous-speed.png'

class HyperjetEngine extends Component {
  engineSpeed = () => {
    let src = ''
    switch(this.props.speed) {
      case 'light':
        src = light;
        break;
      case 'ridiculous':
        src = ridiculous;
        break;
      case 'ludicrous':
        src = ludicrous;
        break;
      default:
        src = light;
    }
    return <img className="" src={src} alt="Engine speed" />;
  }
  render() {
    return (
      <div className={this.props.speed}>
        {this.engineSpeed()}
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    speed: state.speed,
  }
}

export default connect(mapStateToProps)(HyperjetEngine);