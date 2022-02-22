import { bookTypes } from "../types/bookTypes";

const initialState = {
  selectedBook: {},
  favorites: [],
  searchResultBooks: [],
};

const bookReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case bookTypes.GET_FAVORITED_BOOKS_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    case bookTypes.GET_SAVE_FAVORITED_BOOK_SUCCESS:
      return {
        ...state,
        favorites: [...state.favorites, payload.favoritedBook],
      };
    case bookTypes.GET_REMOVE_FAVORITED_BOOK_SUCCESS:
      return {
        ...state,
        favorites: [
          ...state.favorites.filter(
            (book) => book.googleBooksId !== payload.favoritedBook.googleBooksId
          ),
        ],
      };
    case bookTypes.GET_SELECT_BOOK:
    case bookTypes.GET_SEARCH_BOOK_BY_ID_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    case bookTypes.SET_SORTED_FAVORITES: {
      return {
        ...state,
        favorites: [...payload.sortedItems],
      };
    }
    case bookTypes.SET_SORTED_SEARCH_RESULTS: {
      return {
        ...state,
        searchResultBooks: [...payload.sortedItems],
      };
    }
    case bookTypes.SET_SEARCH_INITIAL_STATE:
      return {
        ...state,
        searchResultBooks: [],
      };
    case bookTypes.GET_SEARCH_BOOK_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default bookReducer;
