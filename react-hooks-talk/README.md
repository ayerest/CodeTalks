Live Demo Steps:

Step 0 --> Brief description of class component functionality

1) Copy the input field and button
   1. Add guessInput to state with useState
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
   3. Copy window width section and add to state
   4. Add useEffect to subscribe to window resize event
   5. Add windowWidth to dependency array 
   6. Unsubscribe in cleanup function
4) Copy the guesses remaining
   1. Hook up to the redux store with useSelector
5) Add useEffect to load the game
   1. Add loadingGame to state
   2. Copy loadingGame logic
   3. updating loadingGame but wrap in setTimeout
   4. dispatch load action to redux store in timeout
6) Add useEffect cleanup function to fix memory leak
   1. clearTimeout
7) Finish TODO from step 2d
   1. Dispatch checkguess action
   2. add useEffect w/ only a cleanup function to reset the game
8) Copy guessedCorrectly/gameOver logic
   1. Hook up to redux store
9) Extract custom hook






<!-- 1. Copy JSX from Class Component
2. Copy simple handler functions first and leave body of functions blank
3. Find the references to this.props redux stuff 
    1. create variables with dummy info for now
    2. add comments to come back to them later
4. Find all references to this.state
    1. Delete them and create useState refs
    2. Explain the difference between class component state and functional component state 
        1. objects vs primitives
        2. Merging state vs not
        3. Can call multiple times and order of state variables matters
    3. Now find all this.setState refs
        1. Delete and add setWhatever functions up
5. Create a useEffect function that is empty except for a console.log
    1. Show how often the function is fired
    2. Now fill in with the document.title update
    3. Show that one useEffect does what componentDidMount and componentDidUpdate did for the class component
6. Add another useEffect function for selecting the secret word (redux action)
    1. Now will need to set up redux logic
        1. Introduce useSelector
            1. Now will be a good time to quickly replace the dummy info with real info
        2. Introduce useDispatch
        3. Wrap in a setTimeout
    2. Don’t forget to add dependencies for useEffect and talk about the dependency array
    3. Show the memory leak error 
        1. Set up the cleanup effect in the return function of the useEffect
7. Add redux logic to check the guess
8. Add redux logic to reset the game when the component is removed/reloaded
    1. Talk about how unrelated logic can be split up in different useEffect calls
9. Finally extract the useEffect to get the secret phrase to a custom Hook -->