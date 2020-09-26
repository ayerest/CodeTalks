const reset = () => {
  return { type: "RESET" };
};

const checkGuess = (guess) => {
  return { type: "CHECKGUESS", payload: guess };
}

export { reset, checkGuess };
