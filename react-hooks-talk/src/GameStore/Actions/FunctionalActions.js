const load = () => {
  return { type: "LOAD" };
};

const reset = () => {
  return { type: 'RESET' };
}

const checkGuess = (guess) => {
  return { type: "CHECKGUESS", payload: guess };
}

export { load, reset, checkGuess };
