import { userTypes } from "../types/userTypes";

const initialState = { user: { loggedIn: false } };

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case userTypes.GET_SESSION_SUCCESS:
    case userTypes.GET_SIGNUP_SUCCESS:
    case userTypes.GET_SIGNOUT_SUCCESS:
    case userTypes.GET_SIGNIN_SUCCESS:
      return {
        ...state,
        user: {
          ...payload,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
