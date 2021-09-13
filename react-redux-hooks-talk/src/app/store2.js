import { createStore, combineReducers } from "redux";

const initialState = {
  speed: 'light',
  accelerating: true
};

const functionalReducer = (state = initialState, action) => {
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
