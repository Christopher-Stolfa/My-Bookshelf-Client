import {
  GET_SESSION_SUCCESS,
  GET_SIGNUP_SUCCESS,
  GET_SIGNIN_SUCCESS,
  GET_SIGNOUT_SUCCESS
} from "../actions/types";

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SESSION_SUCCESS:
      return {
        ...state,
        user: {
          message: action.payload.message,
          loggedIn: action.payload.loggedIn,
          userData: action.payload.userData
        }
      };
    case GET_SIGNUP_SUCCESS:
      return {
        ...state,
        user: {
          message: action.payload.message
        }
      };
    case GET_SIGNOUT_SUCCESS:
      return {
        ...state,
        user: {
          message: action.payload.message,
          loggedIn: action.payload.loggedIn
        }
      };
    case GET_SIGNIN_SUCCESS:
      return {
        ...state,
        user: {
          message: action.payload.message,
          userData: action.payload.userData,
          loggedIn: action.payload.loggedIn
        }
      };
    default:
      return state;
  }
};

export default userReducer;
