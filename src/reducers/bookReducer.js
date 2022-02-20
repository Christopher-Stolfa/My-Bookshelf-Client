import {
  GET_FAVORITED_BOOKS_SUCCESS,
  GET_REMOVE_FAVORITED_BOOK_SUCCESS,
  GET_SAVE_FAVORITED_BOOK_SUCCESS,
  GET_SEARCH_BOOK_BY_ID_SUCCESS,
  GET_SELECT_BOOK,
  SET_SORTED_FAVORITES,
  GET_SEARCH_BOOK_SUCCESS,
  SET_SEARCH_INITIAL_STATE
} from "../types/bookTypes";

const initialState = {
  selectedBook: {},
  favorites: [],
  searchResultBooks: []
};

const bookReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FAVORITED_BOOKS_SUCCESS:
      return {
        ...state,
        ...payload
      };
    case GET_SAVE_FAVORITED_BOOK_SUCCESS:
      return {
        ...state,
        favorites: [...state.favorites, payload.favoritedBook]
      };
    case GET_REMOVE_FAVORITED_BOOK_SUCCESS:
      return {
        ...state,
        favorites: [
          ...state.favorites.filter(
            book => book.googleBooksId !== payload.favoritedBook.googleBooksId
          )
        ]
      };
    case GET_SELECT_BOOK:
    case GET_SEARCH_BOOK_BY_ID_SUCCESS:
      return {
        ...state,
        ...payload
      };
    case SET_SORTED_FAVORITES: {
      return {
        ...state,
        ...payload
      };
    }
    case SET_SEARCH_INITIAL_STATE:
      return initialState;
    case GET_SEARCH_BOOK_SUCCESS:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};

export default bookReducer;
