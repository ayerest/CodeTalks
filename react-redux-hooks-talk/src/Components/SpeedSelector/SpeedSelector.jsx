import React from 'react';
import { useDispatch } from 'react-redux';

const SpeedSelector = () => {
  const dispatch = useDispatch();
  const changeSpeedHandler = (e) => {
    dispatch({type: e.target.value})
  }
  return (
    <div className="selector">
      {/* <label>Choose a speed:</label>

      <select name="speed" id="speed-select" onChange={changeSpeedHandler}>
        <option value="">--Please choose an option--</option>
        <option value="Light">Light</option>
        <option value="Ridiculous">Ridiculous</option>
        <option value="Ludicrous">Ludicrous</option>
      </select> */}
      <button className='light speedControl' onClick={changeSpeedHandler} value="Light">LIGHT SPEED</button>
      <button className='ridiculous speedControl' onClick={changeSpeedHandler} value="Ridiculous">RIDICULOUS SPEED</button>
      <button className='ludicrous speedControl' onClick={changeSpeedHandler} value="Ludicrous">LUDICROUS SPEED</button>
    </div>
  )
}

export default SpeedSelector;