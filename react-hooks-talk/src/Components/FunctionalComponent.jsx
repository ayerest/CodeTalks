import React, { useState, useEffect } from 'react';

const FunctionalComponent = (props) => {
  const [inputField, setInputField] = useState('');
  const [secondInputField, setSecondInputField] = useState('');

  const inputFieldChangeHandler = (e) => {
    setInputField(e.target.value);
  }

  const secondInputFieldChangeHandler = (e) => {
    setSecondInputField(e.target.value);
  }

  useEffect(() => {
    console.log("functional component use effect");
    const timer = setTimeout(() => {
      setInputField('Time out')
    }, 2000)
    return () => {
      clearTimeout(timer);
    }
  }, [])

  useEffect(() => {
    console.log("third use effect")
    setSecondInputField(props.secondCounter)
  }, [props.secondCounter])

  return (
    <div className="component">
      <h2>Functional Component</h2>
      <p>Counter: {props.counter}</p>
      <p>SecondCounter: {props.secondCounter}</p>
      <input type="text" placeholder="Enter text here" value={inputField} onChange={inputFieldChangeHandler} />
      <input type="text" placeholder="Enter text here" value={secondInputField} onChange={secondInputFieldChangeHandler} />
      <ul>
        <li>{inputField}</li>
        <li>{secondInputField}</li>
      </ul>
    </div>
  )
}

export default FunctionalComponent;