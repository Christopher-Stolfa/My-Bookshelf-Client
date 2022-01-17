import {
  GET_SESSION_SUCCESS,
  GET_SIGNUP_SUCCESS,
  GET_SIGNIN_SUCCESS,
  GET_SIGNOUT_SUCCESS,
} from "../actions/types";

const initialState = {};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SESSION_SUCCESS:
    case GET_SIGNUP_SUCCESS:
    case GET_SIGNOUT_SUCCESS:
    case GET_SIGNIN_SUCCESS:
      return {
        ...state,
        user: {
          message: payload.message,
          loggedIn: payload.loggedIn,
          userData: payload.userData,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
