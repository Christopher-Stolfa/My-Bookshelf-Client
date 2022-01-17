import { combineReducers } from "redux";
import userReducer from "./userReducer";
import snackbarReducer from "./snackbarReducer";
import searchReducer from "./searchReducer";
import uiReducer from "./uiReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  searchState: searchReducer,
  snackbarState: snackbarReducer,
  uiState: uiReducer,
});

export default rootReducer;
