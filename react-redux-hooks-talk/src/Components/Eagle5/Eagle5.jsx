import React from 'react';
import { useDispatch  } from 'react-redux';

const Eagle5 = () => {
  const dispatch = useDispatch();
  const jamRadar = () => {
    dispatch({ type: 'Jam', payload: 'Raspberry' })
  }
  return (
    <button onClick={jamRadar}>Jam Radar</button>
  )
}

export default Eagle5;