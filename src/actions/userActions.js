import { userTypes } from "../types/userTypes";
import { snackbarActions } from "./snackbarActions";
import { userService } from "../services/user.service";
import { startAction, stopAction } from "./uiActions";

const { setSnackbarError, setSnackbarSuccess } = snackbarActions;

const getUserSession = () => async (dispatch) => {
  try {
    dispatch(startAction(userTypes.GET_SESSION_FETCH));
    const { data } = await userService.getSession();
    dispatch({
      type: userTypes.GET_SESSION_SUCCESS,
      payload: data,
    });
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(userTypes.GET_SESSION_FETCH));
  }
};

const signUp = (inputData) => async (dispatch) => {
  try {
    dispatch(startAction(userTypes.GET_SIGNUP_FETCH));
    const { data } = await userService.signUp(inputData);
    dispatch({
      type: userTypes.GET_SIGNUP_SUCCESS,
      payload: data,
    });
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(userTypes.GET_SIGNUP_FETCH));
  }
};

const signIn = (inputData) => async (dispatch) => {
  try {
    dispatch(startAction(userTypes.GET_SIGNIN_FETCH));
    const { data } = await userService.signIn(inputData);
    dispatch({
      type: userTypes.GET_SIGNIN_SUCCESS,
      payload: data,
    });
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(userTypes.GET_SIGNIN_FETCH));
  }
};

const signOut = () => async (dispatch) => {
  const getSignOutSuccess = (data) => ({
    type: userTypes.GET_SIGNOUT_SUCCESS,
    payload: data,
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

const forgotPassword = (inputData) => async (dispatch) => {
  try {
    dispatch(startAction(userTypes.GET_FORGOT_PASSWORD_FETCH));
    const { data } = await userService.sendPasswordReset(inputData);
    dispatch({
      type: userTypes.GET_FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(userTypes.GET_FORGOT_PASSWORD_FETCH));
  }
};

const checkResetToken = (inputData) => async (dispatch) => {
  try {
    dispatch(startAction(userTypes.GET_CHECK_RESET_TOKEN_FETCH));
    const { data } = await userService.checkResetToken(inputData);
    return data;
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(userTypes.GET_CHECK_RESET_TOKEN_FETCH));
  }
};

const updatePasswordWithToken = (inputData) => async (dispatch) => {
  try {
    dispatch(startAction(userTypes.GET_UPDATE_PASSWORD_WITH_TOKEN_FETCH));
    const { data } = await userService.updatePasswordWithToken(inputData);
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(userTypes.GET_UPDATE_PASSWORD_WITH_TOKEN_FETCH));
  }
};

const updatePassword = (inputData) => async (dispatch) => {
  try {
    dispatch(startAction(userTypes.UPDATE_PASSWORD_FETCH));
    const { data } = await userService.updatePassword(inputData);
    setSnackbarSuccess(data, dispatch);
  } catch (err) {
    setSnackbarError(err.response.data, dispatch);
  } finally {
    dispatch(stopAction(userTypes.UPDATE_PASSWORD_FETCH));
  }
};

export const userActions = {
  getUserSession,
  signUp,
  signIn,
  signOut,
  forgotPassword,
  checkResetToken,
  updatePasswordWithToken,
  updatePassword,
};
