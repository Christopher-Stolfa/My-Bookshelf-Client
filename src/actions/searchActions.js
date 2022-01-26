import { searchTypes } from "../types/searchTypes";
import { snackbarActions } from "./snackbarActions";
import { startAction, stopAction } from "./uiActions";
import { searchService } from "../services/books.service";

const { setSnackbarSuccess, setSnackbarError } = snackbarActions;

const searchBook = (inputData) => async (dispatch) => {
  const getSearchBookSuccess = (data) => ({
    type: searchTypes.GET_SEARCH_BOOK_SUCCESS,
    payload: data,
  });
  try {
    dispatch(startAction(searchTypes.GET_SEARCH_BOOK_FETCH));
    const { data } = await searchService.searchBook(inputData);
    dispatch(getSearchBookSuccess(data));
    setSnackbarSuccess(data, dispatch);
  } catch (error) {
    setSnackbarError(error.response.data, dispatch);
  } finally {
    dispatch(stopAction(searchTypes.GET_SEARCH_BOOK_FETCH));
  }
};

const searchBookById = (inputData) => async (dispatch) => {
  const getSearchBookByIdSuccess = (data) => ({
    type: searchTypes.GET_SEARCH_BOOK_BY_ID_SUCCESS,
    payload: data,
  });
  try {
    dispatch(startAction(searchTypes.GET_SEARCH_BOOK_BY_ID_FETCH));
    const { data } = await searchService.searchBook(inputData);
    dispatch(getSearchBookByIdSuccess(data));
    setSnackbarSuccess(data, dispatch);
  } catch (error) {
    setSnackbarError(error.response.data, dispatch);
  } finally {
    dispatch(stopAction(searchTypes.GET_SEARCH_BOOK_BY_ID_FETCH));
  }
};

export const searchActions = { searchBook, searchBookById };
