import { searchTypes } from "../types/searchTypes";

const initialState = {
  searchResults: { bookSearchData: [], totalItems: 0, searchQuery: "" }
};

const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case searchTypes.GET_SEARCH_BOOK_SUCCESS:
      return {
        ...state,
        searchResults: {
          ...payload
        }
      };
    default:
      return state;
  }
};

export default searchReducer;
