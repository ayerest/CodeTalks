import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const FunctionalComponent = (props) => {
  const [firstInputField, setFirstInputField] = useState('');
  const [secondInputField, setSecondInputField] = useState('');
  const [combinedInput, setCombinedInput] = useState('');
  // const [objectData, setObjectData] = useState({firstField: '', secondField: ''})

  const counter = useSelector(state => state.counter);

  useEffect(() => {
    console.log("use effect");
    const timer = setTimeout(() => {
      setSecondInputField('Time out');
    }, 2000)
    return () => {
      clearTimeout(timer);
    }
  });

  useEffect(() => {
    console.log("second useeffect function");
    setCombinedInput(parseInt(firstInputField) + parseInt(secondInputField))
  }, [firstInputField, secondInputField])

  const firstInputFieldChangeHandler = (e) => {
    setFirstInputField(e.target.value);
  }

  const secondInputFieldChangeHandler = (e) => {
    setSecondInputField(e.target.value);
  }

  return (
    <div className="component">
      <h2>Functional Component</h2>
      <p>Counter: {props.counter}</p>
      <p>SecondCounter: {props.secondCounter}</p>
      <input
        type="text"
        placeholder="Enter text here"
        value={firstInputField}
        onChange={firstInputFieldChangeHandler}
      />
      <input
        type="text"
        placeholder="Enter text here"
        value={secondInputField}
        onChange={secondInputFieldChangeHandler}
      />
      <ul>
        <li>First input: {firstInputField} </li>
        <li>Second input: {secondInputField} </li>
        <li>Combined input: {combinedInput} </li>
      </ul>
      {counter}
      <div className="buttonSection">
        <button type="button" onClick={props.incrementCounter}>
          Increment Counter
        </button>
        <button type="button" onClick={props.incrementSecondCounter}>
          Increment Second Counter
        </button>
      </div>
    </div>
  );
}

export default FunctionalComponent;