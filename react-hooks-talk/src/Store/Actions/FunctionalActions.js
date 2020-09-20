const selectPhrase = () => {
  return { type: "SELECTPHRASEFUNCTIONAL" };
};

const reset = () => {
  return { type: "RESETFUNCTIONAL" };
};

const checkGuess = (guess) => {
  return { type: "CHECKGUESSFUNCTIONAL", payload: guess };
}

export { selectPhrase, reset, checkGuess };
