import checkPropTypes from "check-prop-types";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../src/reducers";
import { middlewares } from "../src/store";

export const findByTestAtrr = (component, attr) =>
  component.find(`[data-test="${attr}"]`);

export const checkProps = (component, expectedProps) =>
  checkPropTypes(component.propTypes, expectedProps, "props", component.name);

export const testStore = (initialState) =>
  applyMiddleware(...middlewares)(createStore)(rootReducer)(initialState);
