import { searchTypes } from "../types/searchTypes";

const initialState = {
  searchResults: {
    bookSearchData: [],
    totalItems: 0,
    searchQuery: "",
    selectedBookData: {},
  },
};

const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case searchTypes.GET_SEARCH_BOOK_SUCCESS:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          ...payload,
        },
      };
    case searchTypes.GET_SEARCH_BOOK_BY_ID_SUCCESS:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          ...payload,
        },
      };
    default:
      return state;
  }
};

export default searchReducer;
