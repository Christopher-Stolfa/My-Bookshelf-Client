import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import snackbarReducer from "./snackbarReducer";
import searchReducer from "./searchReducer";
import uiReducer from "./uiReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  searchState: searchReducer,
  errorState: errorReducer,
  snackbarState: snackbarReducer,
  uiState: uiReducer,
});

export default rootReducer;
