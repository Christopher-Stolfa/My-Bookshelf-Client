import { combineReducers } from "redux";
import homeReducer from "./homeReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  homeState: homeReducer,
  userState: userReducer
});

export default rootReducer;
