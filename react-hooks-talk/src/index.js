import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Game/App';
// import App from './BookShelf/App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from "redux";
import { Provider } from 'react-redux';
import FunctionalGameReducer from './GameStore/gameReducer';
import ClassGameReducer from './GameStore/classGameReducer';
// import ClassBooksReducer from './BookStore/ClassBooksReducer';
// import FunctionalBooksReducer from './BookStore/FunctionalBooksReducer';

const rootReducer = combineReducers({
  class: ClassGameReducer,
  functional: FunctionalGameReducer,
});

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
