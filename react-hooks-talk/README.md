*Tuesday September 27th CodeTalk*

Live Demo Steps:

Step 0 --> Brief description of class component functionality

1) Copy the input field and button
   1. Add guessInput and loadingGame to state with useState
   2. Copy the input change handler function (update guessInput state)
   3. Copy the submit handler function
   4. TODO for gameOver value
2) Copy the previousGuesses list
   1. Add previousGuesses to state
   2. Update previousGuesses in submit handler function
   3. Update guessInput to empty string in submit handler function ?? (optional - see step 3i)
   4. TODO to dispatch checkGuess action
3) Add useEffect to update document.title
   1. Show that useEffect runs even when guessInput isn't changing (submitHandler)
   2. Add dependency array with guessInput so that the useEffect only runs when the input changes
4) Copy window width section and add to state
   1. Add useEffect to subscribe to window resize event
   2. Add windowWidth to dependency array 
   3. Unsubscribe in cleanup function
5) Copy the guesses remaining
   1. Hook up to the redux store with useSelector
   2. Finish TODO from step 1iv (gameOver)
6) Add useEffect to load the game
   1. Copy loadingGame logic
   2. updating loadingGame but wrap in setTimeout
   3. dispatch load action to redux store in timeout
   4. add useEffect cleanup function to fix memory leak with clearTimeout
7) Finish TODO from step 2d
   1. Dispatch checkguess action
   2. add useEffect w/ only a cleanup function to reset the game
8) Copy guessedCorrectly/gameOver logic
   1. Hook up to redux store
9) Extract custom hook
10) Summarize and wrap up presentation