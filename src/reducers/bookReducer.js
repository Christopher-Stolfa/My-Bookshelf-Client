import { bookTypes } from "../types/bookTypes";

const initialState = {
  selectedBook: {},
  notes: [],
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
    case bookTypes.GET_FAVORITED_BOOK_SUCCESS:
      return {
        ...state,
        selectedBook: payload.book,
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
    case bookTypes.SET_SELECTED_BOOK_INITIAL_STATE:
      return { ...state, selectedBook: {} };
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
    case bookTypes.SAVE_NOTE_SUCCESS:
      return {
        ...state,
        notes: [...state.notes, payload.noteData],
      };
    case bookTypes.DELETE_NOTE_SUCCESS:
      return {
        ...state,
        notes: [
          ...state.notes.filter((note) => note.noteId !== payload.noteId),
        ],
      };
    case bookTypes.GET_NOTES_SUCCESS:
      return {
        ...state,
        notes: [...payload.notes],
      };
    case bookTypes.SET_NOTES_INITIAL_STATE:
      return {
        ...state,
        notes: [],
      };
    default:
      return state;
  }
};

export default bookReducer;
