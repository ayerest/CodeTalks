import React from 'react';
// import HyperjetEngine from './Components/HyperjetEngine/HyperjetEngine';
import HyperjetEngine from './ClassComponents/HyperjetEngine';
import SpeedSelector from './ClassComponents/SpeedSelector';
// import SpeedSelector from './Components/SpeedSelector/SpeedSelector';
import './App.css';

function App() {
  return (
    <div className="App">
      <SpeedSelector />
      <HyperjetEngine />
    </div>
  );
}

export default App;
