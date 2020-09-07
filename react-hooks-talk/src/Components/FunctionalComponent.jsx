import React, { useState, useEffect } from 'react';

const FunctionalComponent = (props) => {
  const [inputField, setInputField] = useState('');const [secondInputField, setSecondInputField] = useState('');

  useEffect(() => {
    console.log("use effect is running")
    const timer = setTimeout(() => {
      setInputField('Time out');
    }, 2000)
    return () => {
      clearTimeout(timer);
    }
  }, [])

  useEffect(() => {
    console.log("second useEffect function")
    setSecondInputField(props.secondCounter);
  }, [props.secondCounter])

  

  const inputFieldChangeHandler = (e) => {
    setInputField(e.target.value);
  }

  const secondInputFieldHandler = (e) => {
    setSecondInputField(e.target.value);
  }

  return (
    <div className="component">
      <h2>Functional Component</h2>
      <p>Counter: {props.counter}</p>
      <p>SecondCounter: {props.secondCounter}</p>
      <input type="text" placeholder="Enter text here" value={inputField} onChange={inputFieldChangeHandler} />
      <input type="text" placeholder="Enter text here" value={secondInputField} onChange={secondInputFieldHandler} />
      <ul>
        <li>{inputField}</li>
        <li>{secondInputField}</li>
      </ul>
    </div>
  )
}

export default FunctionalComponent;