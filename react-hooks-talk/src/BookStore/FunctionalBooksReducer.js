import books from "../BookData/Books";

const initialState = {
  myBooks: [...books],
};

const FunctionalBooksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATESHELF":
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

export default FunctionalBooksReducer;
