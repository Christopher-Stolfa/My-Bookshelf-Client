import { GET_SEARCH_BOOK_SUCCESS, GET_SEARCH_BOOK_FETCH } from "./types";
import { snackbarActions } from "./snackbarActions";
import { startAction, stopAction } from "./uiActions";
import { searchService } from "../services/books.service";
const { setSnackbarSuccess, setSnackbarError } = snackbarActions;

const searchBook = (inputData) => async (dispatch) => {
  const getSearchBookSuccess = (data) => ({
    type: GET_SEARCH_BOOK_SUCCESS,
    payload: data,
  });
  try {
    dispatch(startAction(GET_SEARCH_BOOK_FETCH));
    const { data } = await searchService.searchBook(inputData);
    dispatch(getSearchBookSuccess(data));
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(GET_SEARCH_BOOK_FETCH));
  }
};

export const bookActions = { searchBook };
