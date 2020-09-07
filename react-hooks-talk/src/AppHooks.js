import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import ClassComponent from "./Components/ClassComponent";
import FunctionalComponent from "./Components/FunctionalComponent";
import { connect } from "react-redux";

function App() {
  const [displayClassComponent, setDisplayClassComponent] = useState(true);
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);
  const secondCounter = useSelector(state => state.secondCounter);
  
  const toggleDisplay = () => {
    setDisplayClassComponent(!displayClassComponent);
  };

  const incrementCounter = () => {
    dispatch({type: 'INCREMENT'});
  };

  const incrementSecondCounter = () => {
    dispatch({ type: "INCREMENT2" });
  };
  
    return (
      <div className="App-header">
        <button type="button" onClick={toggleDisplay}>
          Toggle Components
        </button>
        <div className="buttonSection">
          <button type="button" onClick={incrementCounter}>
            Increment Counter
          </button>
          <button type="button" onClick={incrementSecondCounter}>
            Increment Second Counter
          </button>
        </div>
        {displayClassComponent ? (
          <ClassComponent
            counter={counter}
            secondCounter={secondCounter}
          />
        ) : (
          <FunctionalComponent
            counter={counter}
            secondCounter={secondCounter}
          />
        )}
      </div>
    );
}

export default (App);
