import { createTheme } from "@mui/material/styles";
import colors from "./colors";

const libraryTheme = createTheme({
  palette: {
    primary: {
      main: colors.skyBlue
    }
  }
});
export default libraryTheme;
