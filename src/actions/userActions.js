import { userTypes } from "../types/userTypes";
import { snackbarActions } from "./snackbarActions";
import { userService } from "../services/user.service";
import { startAction, stopAction } from "./uiActions";

const { setSnackbarError, setSnackbarSuccess } = snackbarActions;

const userSaveFavoritedBook = inputData => async dispatch => {
  const getFavoritedBookSuccess = data => ({
    type: userTypes.GET_SAVE_FAVORITED_BOOK_SUCCESS,
    payload: data
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

const getUserSession = () => async dispatch => {
  const getSessionSuccess = data => ({
    type: userTypes.GET_SESSION_SUCCESS,
    payload: data
  });
  try {
    dispatch(startAction(userTypes.GET_SESSION_FETCH));
    const { data } = await userService.getSession();
    dispatch(getSessionSuccess(data));
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(userTypes.GET_SESSION_FETCH));
  }
};

const signUp = inputData => async dispatch => {
  const getSignUpSuccess = data => ({
    type: userTypes.GET_SIGNUP_SUCCESS,
    payload: data
  });
  try {
    dispatch(startAction(userTypes.GET_SIGNUP_FETCH));
    const { data } = await userService.signUp(inputData);
    dispatch(getSignUpSuccess(data));
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(userTypes.GET_SIGNUP_FETCH));
  }
};

const signIn = inputData => async dispatch => {
  const getSignInSuccess = data => ({
    type: userTypes.GET_SIGNIN_SUCCESS,
    payload: data
  });
  try {
    dispatch(startAction(userTypes.GET_SIGNIN_FETCH));
    const { data } = await userService.signIn(inputData);
    dispatch(getSignInSuccess(data));
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(userTypes.GET_SIGNIN_FETCH));
  }
};

const signOut = () => async dispatch => {
  const getSignOutSuccess = data => ({
    type: userTypes.GET_SIGNOUT_SUCCESS,
    payload: data
  });
  try {
    dispatch(startAction(userTypes.GET_SIGNOUT_FETCH));
    const { data } = await userService.signOut();
    dispatch(getSignOutSuccess(data));
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(userTypes.GET_SIGNOUT_FETCH));
  }
};

export const userActions = {
  getUserSession,
  signUp,
  signIn,
  signOut,
  userSaveFavoritedBook
};
