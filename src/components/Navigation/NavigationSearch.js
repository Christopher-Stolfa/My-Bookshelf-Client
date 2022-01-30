import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import { searchActions } from "../../actions/searchActions";
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

const NavigationSearch = ({ searchBook }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleOnChange = ({ target: { value } }) => {
    setSearchQuery(value);
  };

  const handleSubmit = e => {
    if (searchQuery.length > 1) {
      e.preventDefault();
      const inputData = {
        data: JSON.stringify({
          searchQuery,
          orderBy: "relevance"
        })
      };
      searchBook(inputData);
    }
    navigate(routes.searchResults);
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

NavigationSearch.propTypes = {
  searchBook: PropTypes.func.isRequired
};

const actionCreators = {
  searchBook: searchActions.searchBook
};

export default connect(null, actionCreators)(NavigationSearch);
