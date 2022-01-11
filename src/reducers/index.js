import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  errorState: errorReducer
});

export default rootReducer;
