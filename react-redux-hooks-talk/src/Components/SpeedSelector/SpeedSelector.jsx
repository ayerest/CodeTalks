import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SpeedSelector = () => {
  const dispatch = useDispatch();
  const speed = useSelector(state => state.speed);
  const changeSpeedHandler = (e) => {
    dispatch({type: e.target.value})
  }
  return (
    <div className="selector">
      <button className={`light speedControl ${speed !== 'light' ? 'notSelected' : null}`} onClick={changeSpeedHandler} value="Light">LIGHT SPEED</button>
      <button className={`ridiculous speedControl ${speed !== 'ridiculous' ? 'notSelected' : null}`} onClick={changeSpeedHandler} value="Ridiculous">RIDICULOUS SPEED</button>
      <button className={`ludicrous speedControl ${speed !== 'ludicrous' ? 'notSelected' : null}`} onClick={changeSpeedHandler} value="Ludicrous">LUDICROUS SPEED</button>
    </div>
  )
}

export default SpeedSelector;