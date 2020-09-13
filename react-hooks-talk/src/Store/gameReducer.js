import phrases from '../words/words';

const maxGuesses = 5;

const initialState = {
  guessNumber: maxGuesses,
  secretWord: phrases[Math.floor(Math.random() * phrases.length)],
  guessedCorrectly: false,
  gameOver: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DECREMENT':
      return {
        ...state,
        guessNumber: state.guessNumber - 1,
      }
    case 'RESET':
      return {
        ...initialState,
      }
    case 'CHECKGUESS':
      console.log(action.payload);
      if (action.payload === state.secretWord) {
        return {
          ...state,
          guessedCorrectly: true,
          guessNumber: state.guessNumber - 1,
          gameOver: true
        };
      }
      if (state.guessNumber === 1 ) {
        return {
          ...state,
          guessNumber: state.guessNumber - 1,
          gameOver: true,
        }
      }
      return {
        ...state,
        guessNumber: state.guessNumber - 1
      }
    default: 
      return {
        ...state
      }
  }
};

export default reducer;
