import React, { useState } from 'react';

const FunctionalComponent = () => {
  // console.log("rendering functional component");
  const [name, setName] = useState('');
  const inputChangeHandler = (e) => {
    setName(e.target.value)
  }
  return (
    <div>
      <input type="text" value={name} onChange={inputChangeHandler} />
    </div>
  )
}

export default FunctionalComponent;