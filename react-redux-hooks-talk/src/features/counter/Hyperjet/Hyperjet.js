import React from 'react';
import { useSelector } from 'react-redux';
// import test from '../../../app/ludicrousspeed.jpg'

const Hyperjet = () => {
  const speed = useSelector(state => state.functional.speed);
  return (
    <div className={speed}>
    </div>
  )
}

export default Hyperjet;