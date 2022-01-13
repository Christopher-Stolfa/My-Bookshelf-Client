import { GET_SEARCH_BOOK_SUCCESS } from "../actions/types";

const initialState = { bookSearchData: [] };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH_BOOK_SUCCESS:
      return {
        ...state,
        books: {
          message: action.payload.message,
          bookSearchData: action.payload.bookSearchData
        }
      };
    default:
      return state;
  }
};

export default userReducer;
