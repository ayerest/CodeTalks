# CodeTalks

1. Copy JSX from Class Component
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
    4. Add the randombook generator example
7. Add redux logic to check the guess
8. Add redux logic to reset the game when the component is removed/reloaded
    1. Talk about how unrelated logic can be split up in different useEffect calls
9. Finally extract the useEffect to get the secret phrase to a custom Hook
10. Same as above for randombook generator
