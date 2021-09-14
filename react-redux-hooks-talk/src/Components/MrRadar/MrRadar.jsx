import React from 'react';
import { useSelector } from 'react-redux';
import Radar from '../../images/mr-radar.png';
import JammedRadar from '../../images/jammed.jpg'


const MrRadar = () => {
  const jammed = useSelector(state => state.jammed);
  return (
    <img src={jammed ? JammedRadar  : Radar} alt="Radar screen" />
  )
}

export default MrRadar;