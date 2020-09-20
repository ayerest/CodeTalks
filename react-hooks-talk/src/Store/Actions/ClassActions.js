const selectPhrase = () => {
  return { type: "SELECTPHRASECLASS" };
};

const reset = () => {
  return { type: 'RESETCLASS' };
};

const checkGuess = (guess) => {
  return { type: 'CHECKGUESSCLASS', payload: guess}
}

export { selectPhrase, reset, checkGuess };
