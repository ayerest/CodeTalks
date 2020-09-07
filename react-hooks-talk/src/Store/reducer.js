const initialState = {
  counter: 0,
  secondCounter: 1,
}


const reducer = (state = initialState, action) => {
  if (action.type === 'INCREMENT') {
    return {
      ...state,
      counter: state.counter + 1,
    }
  }
  if (action.type === 'INCREMENT2') {
    return {
      ...state,
      secondCounter: state.secondCounter + 1,
    }
  }
  return state;
}

export default reducer;