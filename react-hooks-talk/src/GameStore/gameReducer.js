import phrases from '../words/words';

const maxGuesses = 5;

const initialState = {
  guessNumber: maxGuesses,
  secretWords: [...phrases],
  guessedCorrectly: false,
  gameOver: false,
  secretWord: "",
};

const FunctionalGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RESET": 
      return {
        ...initialState,
      }
    case "LOAD":
      return {
        ...initialState,
        secretWord:
          state.secretWords[
            Math.floor(Math.random() * state.secretWords.length)
          ],
      };
    case "CHECKGUESS":
      if (action.payload.toLowerCase() === state.secretWord.toLowerCase()) {
        return {
          ...state,
          guessedCorrectly: true,
          guessNumber: state.guessNumber - 1,
          gameOver: true,
        };
      }
      if (state.guessNumber === 1) {
        return {
          ...state,
          guessNumber: state.guessNumber - 1,
          gameOver: true,
        };
      }
      if (state.guessNumber === 0) {
        return {
          ...state,
          gameOver: true,
        }
      }
      return {
        ...state,
        guessNumber: state.guessNumber - 1,
      };
    default:
      return {
        ...state,
      };
  }
};

export default FunctionalGameReducer;
