import { bookTypes } from "../types/bookTypes";
import { snackbarActions } from "./snackbarActions";
import { startAction, stopAction } from "./uiActions";
import { bookService } from "../services/books.service";

const { setSnackbarError, setSnackbarSuccess } = snackbarActions;

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

const getFavoritedBook = (inputData) => async (dispatch) => {
  try {
    dispatch(startAction(bookTypes.GET_FAVORITED_BOOKS_FETCH));
    const { data } = await bookService.getFavoritedBooks(inputData);
    dispatch({ type: bookTypes.GET_FAVORITED_BOOKS_SUCCESS, payload: data });
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(bookTypes.GET_FAVORITED_BOOKS_FETCH));
  }
};

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

// If a user manually reaches a search result page for an item, we fetch for the item.
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

const setSortedItems = (inputData, type) => (dispatch) =>
  dispatch({ type, payload: inputData });

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

const editNote = (inputData) => async (dispatch) => {};

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

const setInitialNotesState = () => (dispatch) =>
  dispatch({
    type: bookTypes.SET_NOTES_INITIAL_STATE,
    payload: {},
  });

const setInitialSearchState = () => (dispatch) =>
  dispatch({ type: bookTypes.SET_SEARCH_INITIAL_STATE, payload: {} });

export const bookActions = {
  saveFavoritedBook,
  removeFavoritedBook,
  getFavoritedBooks,
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
};
