import books from "../BookData/Books";

const initialState = {
  myBooks: [...books]
};

const ClassBooksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATELIST":
      console.log(action.payload);
      return {
        ...state,
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
