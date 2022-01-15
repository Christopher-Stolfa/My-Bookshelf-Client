import { GET_SEARCH_BOOK_SUCCESS } from "../actions/types";

const initialState = { books: { bookSearchData: [] } };

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SEARCH_BOOK_SUCCESS:
      return {
        ...state,
        books: {
          message: payload.message,
          bookSearchData: payload.bookSearchData,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
