const load = () => {
  return { type: "LOAD" };
};

const checkGuess = (guess) => {
  return { type: "CHECKGUESS", payload: guess };
}

export { load, checkGuess };
