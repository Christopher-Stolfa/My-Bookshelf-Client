import { combineReducers } from "redux";
import userReducer from "./userReducer";
import snackbarReducer from "./snackbarReducer";
import searchReducer from "./searchReducer";
import uiReducer from "./uiReducer";
import bookReducer from "./bookReducer";
import quoteReducer from "./quoteReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  searchState: searchReducer,
  snackbarState: snackbarReducer,
  uiState: uiReducer,
  bookState: bookReducer,
  quoteState: quoteReducer,
});

export default rootReducer;
