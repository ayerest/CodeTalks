import React, { useState, useEffect } from 'react';

// TODO: add custom hook / refactor one of the useEffect functions into a custom hook

const FunctionalComponent = (props) => {
  // Step 1: Add state using useState hook
  const [name, setName] = useState('');
  const inputChangeHandler = (e) => {
    setName(e.target.value)
  }
  // Step 2: Add useEffect to demonstrate how often useEffect runs
  useEffect(() => {
    console.log("use effect");
  })

  // Step 3a: Add useEffect to handle side effect
  useEffect(() => {
    console.log("set timeout useEffect")
    // Step 3b: setTimeout that alters state to create a memory leak
    const timer = setTimeout(() => {
      setName('Timing out');
    }, 1000)
    // Step 3c: clear timeout in useeffect cleanup function
    return () => {
      clearTimeout(timer);
    }
    // Step 3d: add empty dependency array so that this effect only runs for the first render
  }, [])

  // Step 4: add useEffect with dependency array
  useEffect(() => {
    // Step 4a: demonstrate only runs when the second counter changes
    console.log("last useEffect");
    setName(props.secondCounter);
  }, [props.secondCounter])

  // TODO: update to reflect most recent changes
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