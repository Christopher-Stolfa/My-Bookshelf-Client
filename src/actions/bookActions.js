import { bookTypes } from "../types/bookTypes";
import { snackbarActions } from "./snackbarActions";
import { startAction, stopAction } from "./uiActions";
import { bookService } from "../services/books.service";

/**
 * Success and error snackbar messages that pop up for the user are triggered
 * by passing the api or error.response data and the dispatch as a callback.
 * example: setSnackbarSuccess(data, dispatch), setSnackbarError(err.response.data, dispatch);
 */
const { setSnackbarError, setSnackbarSuccess } = snackbarActions;

/**
 * The startAction and stopAction functions that are passed into dispatch are used so that
 * components that use the checkIfLoading function can determine what fetch requests are still loading.
 */

/**
 * This action is triggered when a user attempts to save a book to their favorites.
 * @param {object} inputData - Book data from any of the following components - BookCard, FavoriteBookPage, or BookResultPage.
 * If
 */
const saveFavoritedBook = (inputData) => async (dispatch) => {
  try {
    dispatch(startAction(bookTypes.GET_SAVE_FAVORITED_BOOK_FETCH));
    const { data } = await bookService.saveFavoritedBook(inputData);
    dispatch({
      type: bookTypes.GET_SAVE_FAVORITED_BOOK_SUCCESS,
      payload: data,
    });
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(bookTypes.GET_SAVE_FAVORITED_BOOK_FETCH));
  }
};

/**
 * This action is triggered when a user attempts to remove a book to their favorites.
 * @param {object} inputData - Book data from any of the following components - BookCard, FavoriteBookPage, or BookResultPage.
 */
const removeFavoritedBook = (inputData) => async (dispatch) => {
  try {
    dispatch(startAction(bookTypes.GET_REMOVE_FAVORITED_BOOK_FETCH));
    const { data } = await bookService.removeFavoritedBook(inputData);
    dispatch({
      type: bookTypes.GET_REMOVE_FAVORITED_BOOK_SUCCESS,
      payload: data,
    });
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(bookTypes.GET_REMOVE_FAVORITED_BOOK_FETCH));
  }
};

/**
 * This action sends a request to receive favorite books saved by a user.
 * This action is triggered automatically when a user first visits the website before the routes are even rendered.
 * If a user signs in, the router component's useEffect hook will detect a change in user state and trigger this action again.
 */
const getFavoritedBooks = () => async (dispatch) => {
  try {
    dispatch(startAction(bookTypes.GET_FAVORITED_BOOKS_FETCH));
    const { data } = await bookService.getFavoritedBooks();
    dispatch({ type: bookTypes.GET_FAVORITED_BOOKS_SUCCESS, payload: data });
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(bookTypes.GET_FAVORITED_BOOKS_FETCH));
  }
};

/**
 * This action is triggered when FavoriteBookPage has rendered with no favorited book data in state.
 * It takes the queryParam which is the book id at the end of the url and makes a fetch to the backend to try to retrieve that book from favorites.
 * This is usually triggered when a user attempts to access FavoriteBookPage by accessing the page manually. example: Refreshing the page or backing into it from another webpage.
 * @param {object} inputData - An object containing a bookId from FavoriteBookPage
 */
const getFavoritedBook = (inputData) => async (dispatch) => {
  try {
    dispatch(startAction(bookTypes.GET_FAVORITED_BOOK_FETCH));
    const { data } = await bookService.getFavoritedBook(inputData);
    dispatch({ type: bookTypes.GET_FAVORITED_BOOK_SUCCESS, payload: data });
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(bookTypes.GET_FAVORITED_BOOK_FETCH));
  }
};

/**
 * This action is triggered when a user attempts to toggle a book to currently reading or not reading.
 * @param {object} inputData - An object containing googleBooksId, isReading, and progress data from FavoriteBookPage.
 */
const toggleReadingBook = (inputData) => async (dispatch) => {
  try {
    dispatch(startAction(bookTypes.TOGGLE_READING_BOOK_FETCH));
    const { data } = await bookService.toggleReadingBook(inputData);
    dispatch({ type: bookTypes.TOGGLE_READING_BOOK_SUCCESS, payload: data });
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(bookTypes.TOGGLE_READING_BOOK_FETCH));
  }
};

/**
 * This action is triggered when a user attempts to set a number as the percentage of book completion.
 * @param {object} inputData - An object containing googleBooksId and progress data from FavoriteBookPage.
 */
const setBookProgress = (inputData) => async (dispatch) => {
  try {
    dispatch(startAction(bookTypes.SET_BOOK_PROGRESS_FETCH));
    const { data } = await bookService.setBookProgress(inputData);
    dispatch({ type: bookTypes.SET_BOOK_PROGRESS_SUCCESS, payload: data });
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(bookTypes.SET_BOOK_PROGRESS_FETCH));
  }
};

/**
 * This action is triggered when a user selects selects a book from favorites or search results.
 * @param {object} inputData - All data associated with a book from either FavoriteBookPage or BookResultPage component.
 */
const setSelectedBook = (inputData) => (dispatch) => {
  try {
    dispatch(startAction(bookTypes.GET_SELECT_BOOK));
    dispatch({
      type: bookTypes.GET_SELECT_BOOK,
      payload: inputData,
    });
  } catch (error) {
    setSnackbarError(error.response.data, dispatch);
  } finally {
    dispatch(stopAction(bookTypes.GET_SELECT_BOOK));
  }
};

/**
 * This action is triggered when BookResultPage has rendered with no book data in state.
 * It takes the queryParam which is the book id at the end of the url and makes a fetch to the backend to try to retrieve that book from the api.
 * This is usually triggered when a user attempts to access BookResultPage by accessing the page manually. example: Refreshing the page or backing into it from another webpage.
 * @param {object} inputData - An object containing a bookId from BookResultPage
 */
const searchBookById = (inputData) => async (dispatch) => {
  try {
    dispatch(startAction(bookTypes.GET_SEARCH_BOOK_BY_ID_FETCH));
    const { data } = await bookService.searchBookById(inputData);
    dispatch({
      type: bookTypes.GET_SEARCH_BOOK_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    setSnackbarError(error.response.data, dispatch);
  } finally {
    dispatch(stopAction(bookTypes.GET_SEARCH_BOOK_BY_ID_FETCH));
  }
};

/**
 * This action is triggered when a user presses one of the sorting options in the FavoriteBooks or Results component.
 * @param {object} inputData - An object containing an array of sorted book objects.
 * @param {string} type - A string representing what type of book objects have been sorted. Example: SET_SORTED_SEARCH_RESULTS or SET_SORTED_FAVORITES
 * The type allows the reducer to know where to set the sorted data.
 */
const setSortedItems = (inputData, type) => (dispatch) =>
  dispatch({ type, payload: inputData });

/**
 * This action is triggered when a user submits a line of text in the search bar.
 * @param {object} inputData - An object containing a searchQuery string and an object containing a filter to search by.
 * Example {searchQuery: "J.K Rowling", filters: {searchBy: "author"}}
 */
const searchBook = (inputData) => async (dispatch) => {
  try {
    dispatch(startAction(bookTypes.GET_SEARCH_BOOK_FETCH));
    const { data } = await bookService.searchBook(inputData);
    dispatch({
      type: bookTypes.GET_SEARCH_BOOK_SUCCESS,
      payload: data,
    });
    setSnackbarSuccess(data, dispatch);
  } catch (error) {
    setSnackbarError(error.response.data, dispatch);
  } finally {
    dispatch(stopAction(bookTypes.GET_SEARCH_BOOK_FETCH));
  }
};

/**
 * This action is triggered when a user attempts to save a note associated with one of their favorited books.
 * @param {object} inputData - An object containing googleBooksId and noteText params.
 */
const saveNote = (inputData) => async (dispatch) => {
  try {
    dispatch(startAction(bookTypes.SAVE_NOTE_FETCH));
    const { data } = await bookService.saveNote(inputData);
    dispatch({
      type: bookTypes.SAVE_NOTE_SUCCESS,
      payload: data,
    });
    setSnackbarSuccess(data, dispatch);
  } catch (error) {
    setSnackbarError(error.response.data, dispatch);
  } finally {
    dispatch(stopAction(bookTypes.SAVE_NOTE_FETCH));
  }
};

/**
 * This action is triggered when a user attempts to edit a note associated with one of their favorited books.
 * @param {object} inputData - An object containing noteId and noteText params.
 */
const editNote = (inputData) => async (dispatch) => {
  try {
    dispatch(startAction(bookTypes.EDIT_NOTE_FETCH));
    const { data } = await bookService.editNote(inputData);
    dispatch({
      type: bookTypes.EDIT_NOTE_SUCCESS,
      payload: data,
    });
    setSnackbarSuccess(data, dispatch);
  } catch (error) {
    setSnackbarError(error.response.data, dispatch);
  } finally {
    dispatch(stopAction(bookTypes.EDIT_NOTE_FETCH));
  }
};

/**
 * This action is triggered when a user attempts to delete a note associated with one of their favorited books.
 * @param {object} inputData - An object containing a noteId param.
 */
const deleteNote = (inputData) => async (dispatch) => {
  try {
    dispatch(startAction(bookTypes.DELETE_NOTE_FETCH));
    const { data } = await bookService.deleteNote(inputData);
    dispatch({
      type: bookTypes.DELETE_NOTE_SUCCESS,
      payload: data,
    });
    setSnackbarSuccess(data, dispatch);
  } catch (error) {
    setSnackbarError(error.response.data, dispatch);
  } finally {
    dispatch(stopAction(bookTypes.DELETE_NOTE_FETCH));
  }
};

/**
 * This action is triggered when a user accesses the page of a favorited book.
 * @param {object} inputData - An object containing a data object which contains a JSON string with a googleBooksId param from FavoriteBookNotes component.
 */
const getNotes = (inputData) => async (dispatch) => {
  try {
    dispatch(startAction(bookTypes.GET_NOTES_FETCH));
    const { data } = await bookService.getNotes(inputData);
    dispatch({
      type: bookTypes.GET_NOTES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    setSnackbarError(error.response.data, dispatch);
  } finally {
    dispatch(stopAction(bookTypes.GET_NOTES_FETCH));
  }
};

/**
 * Sets the state of notes to an empty array.
 */
const setInitialNotesState = () => (dispatch) =>
  dispatch({
    type: bookTypes.SET_NOTES_INITIAL_STATE,
    payload: {},
  });

/**
 * Sets the state of searchResults to an empty array.
 */
const setInitialSearchState = () => (dispatch) =>
  dispatch({ type: bookTypes.SET_SEARCH_INITIAL_STATE });

/**
 * Sets the state of selectedBook to an empty object.
 */
const setInitialSelectedBookState = () => (dispatch) =>
  dispatch({ type: bookTypes.SET_SELECTED_BOOK_INITIAL_STATE });

/**
 * Sets the state of favorites to an empty array.
 */
const setInitialFavoritesState = () => (dispatch) =>
  dispatch({ type: bookTypes.SET_FAVORITES_INITIAL_STATE });

export const bookActions = {
  saveFavoritedBook,
  removeFavoritedBook,
  getFavoritedBooks,
  getFavoritedBook,
  toggleReadingBook,
  setBookProgress,
  setSelectedBook,
  searchBookById,
  setSortedItems,
  searchBook,
  setInitialSearchState,
  saveNote,
  editNote,
  deleteNote,
  getNotes,
  setInitialNotesState,
  setInitialSelectedBookState,
  setInitialFavoritesState,
};
