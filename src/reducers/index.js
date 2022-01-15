import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import snackbarReducer from "./snackbarReducer";
import bookReducer from "./bookReducer";
import uiReducer from "./uiReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  bookState: bookReducer,
  errorState: errorReducer,
  snackbarState: snackbarReducer,
  uiState: uiReducer,
});

export default rootReducer;
