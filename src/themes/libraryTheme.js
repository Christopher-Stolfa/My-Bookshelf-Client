import { createTheme } from "@mui/material/styles";

const colors = {
  skyBlue: "#6386C7",
  cherryRed: "#EC1616"
};

export const libraryTheme = createTheme({
  palette: {
    primary: {
      main: colors.skyBlue
    },
    error: {
      main: colors.cherryRed
    }
  }
});
