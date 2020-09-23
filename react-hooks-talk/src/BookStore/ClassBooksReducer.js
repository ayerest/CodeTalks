import { bookshelves } from "../BookData/Books";

const initialState = {
  myBooks: bookshelves
};

const ClassBooksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATELIST":
      console.log(action.payload);
      return {
        myBooks: [...state.myBooks, action.payload],
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

export default ClassBooksReducer;
