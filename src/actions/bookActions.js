import {
  GET_SAVE_FAVORITED_BOOK_FETCH,
  GET_SAVE_FAVORITED_BOOK_SUCCESS,
  GET_REMOVE_FAVORITED_BOOK_SUCCESS,
  GET_REMOVE_FAVORITED_BOOK_FETCH,
  GET_FAVORITED_BOOKS_FETCH,
  GET_FAVORITED_BOOKS_SUCCESS,
  GET_SELECT_BOOK,
  GET_SEARCH_BOOK_BY_ID_FETCH,
  GET_SEARCH_BOOK_BY_ID_SUCCESS
} from "../types/bookTypes";
import { snackbarActions } from "./snackbarActions";
import { startAction, stopAction } from "./uiActions";
import { userService } from "../services/user.service";
import { bookService } from "../services/books.service";

const { setSnackbarError, setSnackbarSuccess } = snackbarActions;

const saveFavoritedBook = inputData => async dispatch => {
  try {
    dispatch(startAction(GET_SAVE_FAVORITED_BOOK_FETCH));
    const { data } = await userService.saveFavoritedBook(inputData);
    dispatch({
      type: GET_SAVE_FAVORITED_BOOK_SUCCESS,
      payload: data
    });
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(GET_SAVE_FAVORITED_BOOK_FETCH));
  }
};

const removeFavoritedBook = inputData => async dispatch => {
  try {
    dispatch(startAction(GET_REMOVE_FAVORITED_BOOK_FETCH));
    const { data } = await userService.removeFavoritedBook(inputData);
    dispatch({
      type: GET_REMOVE_FAVORITED_BOOK_SUCCESS,
      payload: data
    });
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(GET_REMOVE_FAVORITED_BOOK_FETCH));
  }
};

const getFavoritedBooks = () => async dispatch => {
  try {
    dispatch(startAction(GET_FAVORITED_BOOKS_FETCH));
    const { data } = await userService.getFavoritedBooks();
    dispatch({ type: GET_FAVORITED_BOOKS_SUCCESS, payload: data });
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(GET_FAVORITED_BOOKS_FETCH));
  }
};

const setSelectedBook = inputData => dispatch => {
  try {
    dispatch(startAction(GET_SELECT_BOOK));
    dispatch({
      type: GET_SELECT_BOOK,
      payload: inputData
    });
  } catch (error) {
    setSnackbarError(error.response.data, dispatch);
  } finally {
    dispatch(stopAction(GET_SELECT_BOOK));
  }
};

// If a user manually reaches a search result page for an item, we fetch for the item.
const searchBookById = inputData => async dispatch => {
  try {
    dispatch(startAction(GET_SEARCH_BOOK_BY_ID_FETCH));
    const { data } = await bookService.searchBookById(inputData);
    dispatch({
      type: GET_SEARCH_BOOK_BY_ID_SUCCESS,
      payload: data
    });
  } catch (error) {
    setSnackbarError(error.response.data, dispatch);
  } finally {
    dispatch(stopAction(GET_SEARCH_BOOK_BY_ID_FETCH));
  }
};

export const bookActions = {
  saveFavoritedBook,
  removeFavoritedBook,
  getFavoritedBooks,
  setSelectedBook,
  searchBookById
};