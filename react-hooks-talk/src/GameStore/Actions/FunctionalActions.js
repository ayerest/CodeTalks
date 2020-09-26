const selectPhrase = () => {
  return { type: "SELECTPHRASE" };
};

const reset = () => {
  return { type: "RESET" };
};

const checkGuess = (guess) => {
  return { type: "CHECKGUESS", payload: guess };
}

export { selectPhrase, reset, checkGuess };
