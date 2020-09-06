import React, { useState, useEffect } from 'react';

const FunctionalComponent = (props) => {
  // Step 1: Add state using useState hook
  const [name, setName] = useState('');
  const inputChangeHandler = (e) => {
    setName(e.target.value)
  }
  // Step 2: Add useEffect to handle side effect
  useEffect(() => {
    // Step 3b: demonstrate runs on every increment
    console.log("first useEffect")
    // Step 2a: setTimeout that alters state to create a memory leak
    const timer = setTimeout(() => {
      setName('Timing out');
    }, 1000)
    // Step 2b: clear timeout in useeffect cleanup function
    return () => {
      clearTimeout(timer);
    }
  })

  // Step 3: Add useEffect with empty dependency array
  useEffect(() => {
    // Step 3b: demonstrate only runs once
    console.log("second useEffect")
    // Step 3a: empty dependency array so that useEffect only runs for the first render
  }, [])

  // Step 3c: add useEffect with dependency array
  useEffect(() => {
    // Step 3c
    console.log("third useEffect");
    setName(props.secondCounter);
  }, [props.secondCounter])

  return (
    <div className="component">
      <h2>Functional Component</h2>
      <p>Counter: {props.counter}</p>
      <p>SecondCounter: {props.secondCounter}</p>
      <input type="text" value={name} onChange={inputChangeHandler} />
    </div>
  )
}

export default FunctionalComponent;