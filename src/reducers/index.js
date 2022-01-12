import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import snackbarReducer from "./snackbarReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  errorState: errorReducer,
  snackbarState: snackbarReducer
});

export default rootReducer;
