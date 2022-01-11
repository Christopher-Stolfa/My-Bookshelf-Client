import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import RouterComponent from "./router/router";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <RouterComponent />
  </Provider>,
  document.getElementById("root")
);
