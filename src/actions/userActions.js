import { userTypes } from "../types/userTypes";
import { snackbarActions } from "./snackbarActions";
import { userService } from "../services/user.service";
import { saveToLocalStorage } from "../helpers/localStorageHelpers";
import { startAction, stopAction } from "./uiActions";

const { setSnackbarError, setSnackbarSuccess } = snackbarActions;

const userSaveFavoritedBook = (inputData) => async (dispatch) => {
  const getFavoritedBookSuccess = (data) => ({
    type: userTypes.GET_SAVE_FAVORITED_BOOK_SUCCESS,
    payload: data,
  });
  try {
    dispatch(startAction(userTypes.GET_SAVE_FAVORITED_BOOK_FETCH));
    const { data } = await userService.saveFavoritedBook(inputData);
    dispatch(getFavoritedBookSuccess(data));
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(userTypes.GET_SAVE_FAVORITED_BOOK_FETCH));
  }
};

const getUserSession = () => async (dispatch) => {
  const getSessionSuccess = (data) => ({
    type: userTypes.GET_SESSION_SUCCESS,
    payload: data,
  });
  try {
    const { data } = await userService.getSession();
    saveToLocalStorage({ userState: { user: data } });
    dispatch(getSessionSuccess(data));
  } catch (err) {
    console.log(err);
  }
};

const signUp = (inputData) => async (dispatch) => {
  const getSignUpSuccess = (data) => ({
    type: userTypes.GET_SIGNUP_SUCCESS,
    payload: data,
  });
  try {
    const { data } = await userService.signUp(inputData);
    dispatch(getSignUpSuccess(data));
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  }
};

const signIn = (inputData) => async (dispatch) => {
  const getSignInSuccess = (data) => ({
    type: userTypes.GET_SIGNIN_SUCCESS,
    payload: data,
  });
  try {
    const { data } = await userService.signIn(inputData);
    saveToLocalStorage({ userState: { user: data } });
    dispatch(getSignInSuccess(data));
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  }
};

const signOut = () => async (dispatch) => {
  const getSignOutSuccess = (data) => ({
    type: userTypes.GET_SIGNOUT_SUCCESS,
    payload: data,
  });
  try {
    const { data } = await userService.signOut();
    saveToLocalStorage({ userState: { user: data } });
    dispatch(getSignOutSuccess(data));
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  }
};

export const userActions = {
  getUserSession,
  signUp,
  signIn,
  signOut,
  userSaveFavoritedBook,
};
