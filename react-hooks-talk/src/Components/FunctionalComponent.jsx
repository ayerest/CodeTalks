import React, { useState, useEffect } from 'react';

const FunctionalComponent = (props) => {
  const [inputField, setInputField] = useState('');

  const inputFieldChangeHandler = (e) => {
    setInputField(e.target.value);
  }

  useEffect(() => {
    console.log("functional component use effect");
    const timer = setTimeout(() => {
      setInputField('Time out')
    }, 2000)
    return () => {
      clearTimeout(timer);
    }
  })

  return (
    <div className="component">
      <h2>Functional Component</h2>
      <p>Counter: {props.counter}</p>
      <p>SecondCounter: {props.secondCounter}</p>
      <input type="text" placeholder="Enter text here" value={inputField} onChange={inputFieldChangeHandler} />
      <p>{inputField}</p>
    </div>
  )
}

export default FunctionalComponent;