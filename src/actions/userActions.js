import {
  GET_SESSION_SUCCESS,
  GET_SIGNUP_SUCCESS,
  GET_SIGNIN_SUCCESS,
  GET_SIGNOUT_SUCCESS
} from "./types";
import { getError } from "./errorActions";
import { userService } from "../services/user.service";
import {
  saveToLocalStorage,
  loadFromLocalStorage
} from "../helpers/localStorageHelpers";

const getUserSession = () => async dispatch => {
  const getSessionSuccess = data => ({
    type: GET_SESSION_SUCCESS,
    payload: data
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

const signUp = formData => async dispatch => {
  const getSignUpSuccess = data => ({
    type: GET_SIGNUP_SUCCESS,
    payload: data
  });
  try {
    const { data } = await userService.signUp(formData);
    dispatch(getSignUpSuccess(data));
  } catch (err) {
    dispatch(getError(err.response.data));
  }
};

const signIn = formData => async dispatch => {
  const getSignInSuccess = data => ({
    type: GET_SIGNIN_SUCCESS,
    payload: data
  });
  try {
    const { data } = await userService.signIn(formData);
    saveToLocalStorage({ userState: { user: data } });
    dispatch(getSignInSuccess(data));
  } catch (err) {
    dispatch(getError(err.response.data));
  }
};

const signOut = () => async dispatch => {
  const getSignOutSuccess = data => ({
    type: GET_SIGNOUT_SUCCESS,
    payload: data
  });
  try {
    const { data } = await userService.signOut();
    saveToLocalStorage({ userState: { user: data } });
    dispatch(getSignOutSuccess(data));
  } catch (err) {
    dispatch(getError(err.response.data));
  }
};

export const userActions = {
  getUserSession,
  signUp,
  signIn,
  signOut
};
