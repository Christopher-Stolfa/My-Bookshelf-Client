import { GET_SEARCH_BOOK_SUCCESS } from "./types";
import { snackbarActions } from "./snackbarActions";
import { searchService } from "../services/books.service";
const { setSnackbarSuccess, setSnackbarError } = snackbarActions;

const searchBook = inputData => async dispatch => {
  const getSearchBookSuccess = data => ({
    type: GET_SEARCH_BOOK_SUCCESS,
    payload: data
  });
  try {
    const { data } = await searchService.searchBook(inputData);
    dispatch(getSearchBookSuccess(data));
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  }
};

export const bookActions = { searchBook };
