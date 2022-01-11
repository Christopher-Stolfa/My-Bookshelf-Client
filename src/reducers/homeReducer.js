import { GET_HOME_SUCCESS } from "../actions/types";

const initialState = {};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOME_SUCCESS:
      return {
        ...state,
        home: {
          loggedIn: action.payload.loggedIn
        }
      };
    default:
      return state;
  }
};

export default homeReducer;
