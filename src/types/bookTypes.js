// General book types
// User selects a book
const GET_SELECT_BOOK = "GET_SELECT_BOOK";

// Set the initial state of selected book
const SET_SELECTED_BOOK_INITIAL_STATE = "SET_SELECTED_BOOK_INITIAL_STATE";

// Fetch a specific book by ID
const GET_SEARCH_BOOK_BY_ID_FETCH = "GET_SEARCH_BOOK_BY_ID_FETCH";

// Book search by ID receives data successfully
const GET_SEARCH_BOOK_BY_ID_SUCCESS = "GET_SEARCH_BOOK_BY_ID_SUCCESS";

// Favorite book types
// Get favorited books fetch
const GET_FAVORITED_BOOKS_FETCH = "GET_FAVORITED_BOOKS_FETCH";

// Get favorited books success
const GET_FAVORITED_BOOKS_SUCCESS = "GET_FAVORITED_BOOKS_SUCCESS";

// Get a single favorited book
const GET_FAVORITED_BOOK_FETCH = "GET_FAVORITED_BOOK_FETCH";

// Got a single favorited book successfully
const GET_FAVORITED_BOOK_SUCCESS = "GET_FAVORITED_BOOK_SUCCESS";

// Save favorited book fetch
const GET_SAVE_FAVORITED_BOOK_FETCH = "GET_SAVE_FAVORITED_BOOK_FETCH";

// Save favorited book success
const GET_SAVE_FAVORITED_BOOK_SUCCESS = "GET_SAVE_FAVORITED_BOOK_SUCCESS";

// Remove favorited book fetch
const GET_REMOVE_FAVORITED_BOOK_FETCH = "GET_REMOVE_FAVORITED_BOOK_FETCH";

// Remove favorited book success
const GET_REMOVE_FAVORITED_BOOK_SUCCESS = "GET_REMOVE_FAVORITED_BOOK_SUCCESS";

// Toggle if you are currently reading a book or not
const TOGGLE_READING_BOOK_FETCH = "TOGGLE_READING_BOOK_FETCH";

// Successfully toggled if you are currently reading a book or not
const TOGGLE_READING_BOOK_SUCCESS = "TOGGLE_READING_BOOK_SUCCESS";

// Set sorted favorites to state
const SET_SORTED_FAVORITES = "SET_SORTED_FAVORITES";

// Search results types
// Set sorted search results to state
const SET_SORTED_SEARCH_RESULTS = "SET_SORTED_SEARCH_RESULTS";

// Fetch book from search bar term
const GET_SEARCH_BOOK_FETCH = "GET_SEARCH_BOOK_FETCH";

// Book search receives data successfully
const GET_SEARCH_BOOK_SUCCESS = "GET_SEARCH_BOOK_SUCCESS";

// Sets search results to its initial state
const SET_SEARCH_INITIAL_STATE = "SET_SEARCH_INITIAL_STATE";

// Book note types
// Saves a note associated with a users favorited book
const SAVE_NOTE_FETCH = "SAVE_NOTE_FETCH";

// Successfully saved a note associated with the favorited book
const SAVE_NOTE_SUCCESS = "SAVE_NOTE_SUCCESS";

// Edits the text of an already existing note
const EDIT_NOTE_FETCH = "EDIT_NOTE_FETCH";

// Successfully edited the text of an already existing note
const EDIT_NOTE_SUCCESS = "EDIT_NOTE_SUCCESS";

// Deletes a note associated with a users favorited book
const DELETE_NOTE_FETCH = "DELETE_NOTE_FETCH";

// Successfully deleted a note associated with a users favorited book
const DELETE_NOTE_SUCCESS = "DELETE_NOTE_SUCCESS";

// Gets all notes associated with a users favorited book
const GET_NOTES_FETCH = "GET_NOTES_FETCH";

// Successfully fetched all notes associated with a users favorited book
const GET_NOTES_SUCCESS = "GET_NOTES_SUCCESS";

// Sets notes to its initial state
const SET_NOTES_INITIAL_STATE = "SET_NOTES_INITIAL_STATE";

export const bookTypes = {
  GET_SAVE_FAVORITED_BOOK_FETCH,
  GET_SAVE_FAVORITED_BOOK_SUCCESS,
  GET_REMOVE_FAVORITED_BOOK_SUCCESS,
  GET_REMOVE_FAVORITED_BOOK_FETCH,
  GET_FAVORITED_BOOKS_FETCH,
  GET_FAVORITED_BOOKS_SUCCESS,
  GET_FAVORITED_BOOK_FETCH,
  GET_FAVORITED_BOOK_SUCCESS,
  TOGGLE_READING_BOOK_FETCH,
  TOGGLE_READING_BOOK_SUCCESS,
  GET_SELECT_BOOK,
  GET_SEARCH_BOOK_BY_ID_FETCH,
  GET_SEARCH_BOOK_BY_ID_SUCCESS,
  GET_SEARCH_BOOK_SUCCESS,
  GET_SEARCH_BOOK_FETCH,
  SET_SEARCH_INITIAL_STATE,
  SAVE_NOTE_FETCH,
  SAVE_NOTE_SUCCESS,
  EDIT_NOTE_FETCH,
  EDIT_NOTE_SUCCESS,
  DELETE_NOTE_FETCH,
  DELETE_NOTE_SUCCESS,
  GET_NOTES_FETCH,
  SET_SORTED_FAVORITES,
  SET_SORTED_SEARCH_RESULTS,
  GET_NOTES_SUCCESS,
  SET_NOTES_INITIAL_STATE,
  SET_SELECTED_BOOK_INITIAL_STATE,
};
