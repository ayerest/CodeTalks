import React from 'react';
import { useDispatch } from 'react-redux';

const SpeedSelector = () => {
  const dispatch = useDispatch();
  const changeSpeedHandler = (e) => {
    console.log(e.target.value)
    dispatch({type: e.target.value})
  }
  // TODO: change to buttons styled like the movie
  return (
    <div className="selector">
      <label>Choose a speed:</label>

      <select name="speed" id="speed-select" onChange={changeSpeedHandler}>
        <option value="">--Please choose an option--</option>
        <option value="Light">Light</option>
        <option value="Ridiculous">Ridiculous</option>
        <option value="Ludicrous">Ludicrous</option>
      </select>
    </div>
  )
}

export default SpeedSelector;