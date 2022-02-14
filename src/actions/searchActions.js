import { searchTypes } from "../types/searchTypes";
import { snackbarActions } from "./snackbarActions";
import { startAction, stopAction } from "./uiActions";
import { bookService } from "../services/books.service";

const { setSnackbarSuccess, setSnackbarError } = snackbarActions;

const searchBook = inputData => async dispatch => {
  try {
    dispatch(startAction(searchTypes.GET_SEARCH_BOOK_FETCH));
    const { data } = await bookService.searchBook(inputData);
    dispatch({
      type: searchTypes.GET_SEARCH_BOOK_SUCCESS,
      payload: data
    });
    setSnackbarSuccess(data, dispatch);
  } catch (error) {
    setSnackbarError(error.response.data, dispatch);
  } finally {
    dispatch(stopAction(searchTypes.GET_SEARCH_BOOK_FETCH));
  }
};

const setInitialState = () => dispatch => {
  dispatch({ type: searchTypes.SET_SEARCH_INITIAL_STATE, payload: {} });
};

export const searchActions = { searchBook, setInitialState };
