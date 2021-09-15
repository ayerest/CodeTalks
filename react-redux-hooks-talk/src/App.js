import React from 'react';
import HyperjetEngine from './Components/HyperjetEngine/HyperjetEngine';
// import HyperjetEngine from './ClassComponents/HyperjetEngine';
// import SpeedSelector from './ClassComponents/SpeedSelector';
import SpeedSelector from './Components/SpeedSelector/SpeedSelector';
import './App.css';
// import MrRadar from './Components/MrRadar/MrRadar';
// import Eagle5 from './Components/Eagle5/Eagle5';
// import MrRadar from './ClassComponents/MrRadar';
// import Eagle5 from './ClassComponents/Eagle5';

function App() {
  return (
    <div className="App">
      <SpeedSelector />
      <HyperjetEngine />
      {/* <Eagle5 />
      <MrRadar /> */}
    </div>
  );
}

export default App;
