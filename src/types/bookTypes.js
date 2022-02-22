// User selects a book
export const GET_SELECT_BOOK = "GET_SELECT_BOOK";

// Fetch a specific book by ID
export const GET_SEARCH_BOOK_BY_ID_FETCH = "GET_SEARCH_BOOK_BY_ID_FETCH";

// Book search by ID receives data successfully
export const GET_SEARCH_BOOK_BY_ID_SUCCESS = "GET_SEARCH_BOOK_BY_ID_SUCCESS";

// Get favorited books fetch
export const GET_FAVORITED_BOOKS_FETCH = "GET_FAVORITED_BOOKS_FETCH";

// Get favorited books success
export const GET_FAVORITED_BOOKS_SUCCESS = "GET_FAVORITED_BOOKS_SUCCESS";

// Save favorited book fetch
export const GET_SAVE_FAVORITED_BOOK_FETCH = "GET_SAVE_FAVORITED_BOOK_FETCH";

// Save favorited book success
export const GET_SAVE_FAVORITED_BOOK_SUCCESS =
  "GET_SAVE_FAVORITED_BOOK_SUCCESS";

// Remove favorited book fetch
export const GET_REMOVE_FAVORITED_BOOK_FETCH =
  "GET_REMOVE_FAVORITED_BOOK_FETCH";

// Remove favorited book success
export const GET_REMOVE_FAVORITED_BOOK_SUCCESS =
  "GET_REMOVE_FAVORITED_BOOK_SUCCESS";

// Set sorted favorites to state
export const SET_SORTED_FAVORITES = "SET_SORTED_FAVORITES";

// Set sorted search results to state
export const SET_SORTED_SEARCH_RESULTS = "SET_SORTED_SEARCH_RESULTS";

// Fetch book from search bar term
export const GET_SEARCH_BOOK_FETCH = "GET_SEARCH_BOOK_FETCH";

// Book search receives data successfully
export const GET_SEARCH_BOOK_SUCCESS = "GET_SEARCH_BOOK_SUCCESS";

// Sets search results to its initial state
export const SET_SEARCH_INITIAL_STATE = "SET_SEARCH_INITIAL_STATE";

// Saves a note associated with a users favorited book
export const SAVE_NOTE_FETCH = "SAVE_NOTE_FETCH";

// Edits the text of an already existing note
export const EDIT_NOTE_FETCH = "EDIT_NOTE_FETCH";

// Deletes a note associated with a users favorited book
export const DELETE_NOTE_FETCH = "DELETE_NOTE_FETCH";

// Gets all notes associated with a users favorited book
export const GET_NOTES_FETCH = "GET_NOTES_FETCH";

export const bookTypes = {
  GET_SAVE_FAVORITED_BOOK_FETCH,
  GET_SAVE_FAVORITED_BOOK_SUCCESS,
  GET_REMOVE_FAVORITED_BOOK_SUCCESS,
  GET_REMOVE_FAVORITED_BOOK_FETCH,
  GET_FAVORITED_BOOKS_FETCH,
  GET_FAVORITED_BOOKS_SUCCESS,
  GET_SELECT_BOOK,
  GET_SEARCH_BOOK_BY_ID_FETCH,
  GET_SEARCH_BOOK_BY_ID_SUCCESS,
  GET_SEARCH_BOOK_SUCCESS,
  GET_SEARCH_BOOK_FETCH,
  SET_SEARCH_INITIAL_STATE,
  SAVE_NOTE_FETCH,
  EDIT_NOTE_FETCH,
  DELETE_NOTE_FETCH,
  GET_NOTES_FETCH,
  SET_SORTED_FAVORITES,
  SET_SORTED_SEARCH_RESULTS,
};
