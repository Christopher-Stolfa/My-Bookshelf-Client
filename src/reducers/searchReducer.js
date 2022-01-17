import { searchTypes } from "../types/searchTypes";

const initialState = { searchResults: { bookSearchData: [] } };

const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case searchTypes.GET_SEARCH_BOOK_SUCCESS:
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
