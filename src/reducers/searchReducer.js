import { searchTypes } from "../types/searchTypes";

const initialState = {
  searchResults: {
    bookSearchData: [],
    searchQuery: ""
  }
};

const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case searchTypes.SET_SEARCH_INITIAL_STATE:
      return initialState;
    case searchTypes.GET_SEARCH_BOOK_SUCCESS:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          ...payload
        }
      };
    default:
      return state;
  }
};

export default searchReducer;
