import { createStore } from "redux";

const initialState = {
  speed: 'light',
  accelerating: true,
  jammed: false,
  jamFlavor: '',
};

const SpaceBallsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Light": 
      return {
        ...state,
        speed: 'light'
      }
    case "Ridiculous":
      return {
        ...state,
        speed: 'ridiculous'
      };
    case "Ludicrous":
      return {
        ...state,
        speed: 'ludicrous'
      };
    case "Jam":
      return {
        ...state,
        jammed: true,
        jamFlavor: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

const store = createStore(SpaceBallsReducer, initialState);

export default store;
