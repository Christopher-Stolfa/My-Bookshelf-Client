import { GET_SEARCH_BOOK_SUCCESS } from "../actions/types";

const initialState = { searchResults: { bookSearchData: [] } };

const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SEARCH_BOOK_SUCCESS:
      return {
        ...state,
        searchResults: {
          message: payload.message,
          bookSearchData: payload.bookSearchData,
        },
      };
    default:
      return state;
  }
};

export default searchReducer;
