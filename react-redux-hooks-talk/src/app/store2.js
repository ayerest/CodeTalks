import { createStore, combineReducers } from "redux";

const initialState = {
  speed: 'ludicrous',
  accelerating: true
};

const functionalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIGHT": 
      return {
        ...state,
        speed: 'light'
      }
    case "RIDICULOUS":
      return {
        ...state,
        speed: 'ridiculous'
      };
    case "LUDICROUS":
      return {
        ...state,
        speed: 'ludicrous'
      };
    default:
      return {
        ...state,
      };
  }
};

const rootReducer = combineReducers({
  functional: functionalReducer,
});

const store = createStore(rootReducer);

export default store;
