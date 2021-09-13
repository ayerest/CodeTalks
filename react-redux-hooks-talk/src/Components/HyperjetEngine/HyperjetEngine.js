import React from 'react';
import { useSelector } from 'react-redux';
// import EngineSpeed from '../EngineSpeed/EngineSpeed';
import ludicrous from '../../images/ludicrousspeed.jpg';
import light from '../../images/light-speed.jpg';
import ridiculous from '../../images/ridiculous-speed.png'

const HyperjetEngine = () => {
  const speed = useSelector(state => state.functional.speed);
  const engineSpeed = () => {
    let src = ''
    switch(speed) {
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
  return (
    <div className={speed}>
      {engineSpeed()}
    </div>
  )
}

export default HyperjetEngine;