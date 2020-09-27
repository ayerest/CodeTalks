import phrases from "../words/words";

const maxGuesses = 5;

const initialState = {
  guessNumber: maxGuesses,
  secretWords: [...phrases],
  guessedCorrectly: false,
  gameOver: false,
  secretWord: "",
};

const ClassGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADGAME":
      return {
        ...initialState,
        secretWord:
          state.secretWords[
            Math.floor(Math.random() * state.secretWords.length)
          ],
      };
    case "CHECKGUESSCLASS":
      if (action.payload === state.secretWord) {
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

export default ClassGameReducer;
