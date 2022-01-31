import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import { routes } from "../../config";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  }
}));

const NavigationSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleOnChange = ({ target: { value } }) => {
    setSearchQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    navigate(`${routes.searchResults}/${searchQuery}`);
  };
  return (
    <Search>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit} /*sx={{ mt: 3 }}*/
      >
        <SearchIconWrapper onClick={handleSubmit}>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={handleOnChange}
          placeholder="Search for books…"
          label="Navigation Search"
          id="navigationSearch"
          name="navigationSearch"
          inputProps={{ "aria-label": "search" }}
        />
      </Box>
    </Search>
  );
};

export default NavigationSearch;
