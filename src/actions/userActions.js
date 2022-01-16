import {
  GET_SESSION_SUCCESS,
  GET_SIGNUP_SUCCESS,
  GET_SIGNIN_SUCCESS,
  GET_SIGNOUT_SUCCESS,
} from "./types";
import { getError } from "./errorActions";
import { snackbarActions } from "./snackbarActions";
import { userService } from "../services/user.service";
import { saveToLocalStorage } from "../helpers/localStorageHelpers";

const { setSnackbarError, setSnackbarSuccess } = snackbarActions;

const getUserSession = () => async (dispatch) => {
  const getSessionSuccess = (data) => ({
    type: GET_SESSION_SUCCESS,
    payload: data,
  });
  try {
    const { data } = await userService.getSession();
    saveToLocalStorage({ userState: { user: data } });
    dispatch(getSessionSuccess(data));
  } catch (err) {
    console.log(err);
    dispatch(getError(err.response.data));
  }
};

const signUp = (inputData) => async (dispatch) => {
  const getSignUpSuccess = (data) => ({
    type: GET_SIGNUP_SUCCESS,
    payload: data,
  });
  try {
    const { data } = await userService.signUp(inputData);
    dispatch(getSignUpSuccess(data));
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    dispatch(getError(err.response.data));
    setSnackbarError(err.response.data, dispatch);
  }
};

const signIn = (inputData) => async (dispatch) => {
  const getSignInSuccess = (data) => ({
    type: GET_SIGNIN_SUCCESS,
    payload: data,
  });
  try {
    const { data } = await userService.signIn(inputData);
    saveToLocalStorage({ userState: { user: data } });
    dispatch(getSignInSuccess(data));
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    dispatch(getError(err.response.data));
    setSnackbarError(err.response.data, dispatch);
  }
};

const signOut = () => async (dispatch) => {
  const getSignOutSuccess = (data) => ({
    type: GET_SIGNOUT_SUCCESS,
    payload: data,
  });
  try {
    const { data } = await userService.signOut();
    saveToLocalStorage({ userState: { user: data } });
    dispatch(getSignOutSuccess(data));
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    dispatch(getError(err.response.data));
    setSnackbarError(err.response.data, dispatch);
  }
};

export const userActions = {
  getUserSession,
  signUp,
  signIn,
  signOut,
};
