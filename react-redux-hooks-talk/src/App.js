import React from 'react';
import Hyperjet from './features/counter/Hyperjet/Hyperjet';
import SpeedSelector from './features/SpeedSelector/SpeedSelector';
import './App.css';

function App() {
  return (
    <div className="App">
      <SpeedSelector />
      <Hyperjet />
    </div>
  );
}

export default App;
