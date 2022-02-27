import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export const middlewares = [thunk];

export const createStoreWithMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__
  ? compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )(createStore)
  : applyMiddleware(...middlewares)(createStore);

export const store = createStoreWithMiddleware(rootReducer);
