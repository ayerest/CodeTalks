import React from 'react';

const SpeedSelector = () => {
  return (
    <div className="selector">
      <label for="speed-select">Choose a speed:</label>

      <select name="speed" id="speed-select">
        <option value="">--Please choose an option--</option>
        <option value="Light">Light</option>
        <option value="Ridiculous">Ridiculous</option>
        <option value="Ludicrous">Ludicrous</option>
      </select>
    </div>
  )
}

export default SpeedSelector;