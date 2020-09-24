import { bookshelves } from "../BookData/Books";

const initialState = {
  myBooks: bookshelves,
  authors: [
    "John Steinbeck",
    "Jane Austen",
    "Raymond Chandler",
    "N.K. Jemisin",
    "Maya Angelou",
    "Charlotte Bronte",
    "Mary Shelley",
  ],
};

const FunctionalBooksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATESHELF":
      console.log(action.payload);
      console.log(state.myBooks);
      return {
        myBooks: [...state.myBooks, action.payload]
      };
    case "ADDTOLIST":
      return {
        ...state,
      };
    case "REMOVEFROMLIST":
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};

export default FunctionalBooksReducer;
