import React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import DirectionsIcon from "@mui/icons-material/Directions";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SearchBar from "../../components/SearchBar/SearchBar";

const Background = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxSizing: "border-box",
  borderRadius: "3px",
  width: "100%",
  minHeight: "200px%",
  backgroundColor: "#E6E7E8",
  color: "#333333",
  textAlign: "center",
  padding: "40px 15px 500px",
  // backgroundImage: `url(${process.env.PUBLIC_URL}/library.svg)`,
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}));
const HomePage = (props) => {
  return (
    <Background>
      <Typography variant="h3" gutterBottom>
        Discover books you'll love!
      </Typography>
      <SearchBar />
    </Background>
  );
};

export default HomePage;
