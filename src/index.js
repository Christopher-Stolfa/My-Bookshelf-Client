import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";
import { libraryTheme } from "./themes/libraryTheme";
import "./index.css";
import RouterComponent from "./router/router";
import { Provider } from "react-redux";
import SnackbarNotifier from "./components/SnackbarNotifier/SnackbarNotifier";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={libraryTheme}>
      <SnackbarProvider maxSnack={4}>
        <SnackbarNotifier>
          <RouterComponent />
        </SnackbarNotifier>
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
