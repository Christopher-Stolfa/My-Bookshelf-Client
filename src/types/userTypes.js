// Fetching user session
const GET_SESSION_FETCH = "GET_SESSION_FETCH";

// Get user session success
const GET_SESSION_SUCCESS = "GET_SESSION_SUCCESS";

// Fetching user sign up
const GET_SIGNUP_FETCH = "GET_SIGNUP_FETCH";

// Sign up
const GET_SIGNUP_SUCCESS = "GET_SIGNUP_SUCCESS";

// Fetching user sign in
const GET_SIGNIN_FETCH = "GET_SIGNIN_FETCH";

// Sign in
const GET_SIGNIN_SUCCESS = "GET_SIGNIN_SUCCESS";

// Fetching user sign out
const GET_SIGNOUT_FETCH = "GET_SIGNOUT_FETCH";

// Sign out
const GET_SIGNOUT_SUCCESS = "GET_SIGNOUT_SUCCESS";

// Forgot password fetch
const GET_FORGOT_PASSWORD_FETCH = "GET_FORGOT_PASSWORD_FETCH";

// Forgot password success
const GET_FORGOT_PASSWORD_SUCCESS = "GET_FORGOT_PASSWORD_SUCCESS";

// User is accessing a password reset page which needs token verification
const GET_CHECK_RESET_TOKEN_FETCH = "GET_CHECK_RESET_TOKEN_FETCH";

// User receives a successful response from the server checking if token is valid
const GET_CHECK_RESET_TOKEN_SUCCESS = "GET_CHECK_RESET_TOKEN_SUCCESS";

// User attempts to update password through reset password link with token
const GET_UPDATE_PASSWORD_WITH_TOKEN_FETCH =
  "GET_UPDATE_PASSWORD_WITH_TOKEN_FETCH";

// User successfully updates password through reset password link with token
const GET_UPDATE_PASSWORD_WITH_TOKEN_SUCCESS =
  "GET_UPDATE_PASSWORD_WITH_TOKEN_SUCCESS";

// User attempted to udpate password from the account page
const UPDATE_PASSWORD_FETCH = "UPDATE_PASSWORD_FETCH";

// User successfully updates password
const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";

export const userTypes = {
  GET_SESSION_FETCH,
  GET_SESSION_SUCCESS,
  GET_SIGNUP_FETCH,
  GET_SIGNUP_SUCCESS,
  GET_SIGNIN_FETCH,
  GET_SIGNIN_SUCCESS,
  GET_SIGNOUT_FETCH,
  GET_SIGNOUT_SUCCESS,
  GET_FORGOT_PASSWORD_FETCH,
  GET_FORGOT_PASSWORD_SUCCESS,
  GET_CHECK_RESET_TOKEN_FETCH,
  GET_CHECK_RESET_TOKEN_SUCCESS,
  GET_UPDATE_PASSWORD_WITH_TOKEN_FETCH,
  GET_UPDATE_PASSWORD_WITH_TOKEN_SUCCESS,
  UPDATE_PASSWORD_FETCH,
  UPDATE_PASSWORD_SUCCESS,
};
