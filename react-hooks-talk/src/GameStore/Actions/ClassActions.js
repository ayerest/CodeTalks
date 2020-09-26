const reset = () => {
  return { type: 'RESETCLASS' };
};

const checkGuess = (guess) => {
  return { type: 'CHECKGUESSCLASS', payload: guess}
}

export { selectPhrase, reset, checkGuess };
