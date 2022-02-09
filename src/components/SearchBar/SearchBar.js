import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
import { useNavigate } from "react-router-dom";
import { routes } from "../../config";
import { searchActions } from "../../actions/searchActions";
import { checkIfLoading } from "../../selectors/uiSelectors";
import { searchTypes } from "../../types/searchTypes";

const SUBJECT = "subject:";
const AUTHOR = "inauthor:";
const PUBLISHER = "inpublisher:";

const RELEVANCE = "relevance";
const NEWEST = "newest";

const FormContainer = styled("div")(({ theme }) => ({
  display: "inline-flex",
  position: "relative",
  textAlign: "left",
  margin: 5,
}));

const SearchBar = ({ searchBook, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [orderBy, setOrderBy] = useState(RELEVANCE);
  const navigate = useNavigate();

  const handleOnQueryChange = ({ target: { value } }) => {
    setSearchQuery(value);
  };

  const handleOnSearchChange = ({ target: { value } }) => {
    setSearchBy(value);
  };

  const handleOnSortChange = ({ target: { value } }) => {
    setOrderBy(value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const inputData = {
      data: JSON.stringify({
        searchQuery,
        filters: { orderBy: orderBy, searchBy: searchBy },
      }),
    };
    searchBook(inputData);
    navigate(`${routes.searchResults}/${searchQuery}/1`);
  };

  return (
    <Box component="form" onSubmit={handleOnSubmit}>
      <FormControl>
        <OutlinedInput
          disabled={isLoading}
          onChange={handleOnQueryChange}
          placeholder="Search books..."
          style={{
            alignSelf: "center",
            width: "100%",
            border: "none",
            outline: "none",
            backgroundColor: "#fff",
            boxShadow: "0 8px 20px 0 rgb(0 0 0 / 5%)",
            fontSize: "18px",
            fontWeight: 400,
            lineHeight: "19px",
            minHeight: "64px",
          }}
        />
        <FormContainer>
          <FormLabel>Search by</FormLabel>
          <RadioGroup
            defaultValue={""}
            onChange={handleOnSearchChange}
            sx={{ padding: 1 }}
            row
          >
            <FormControlLabel value="" control={<Radio />} label="Title" />
            <FormControlLabel
              value={SUBJECT}
              control={<Radio />}
              label="Category"
            />
            <FormControlLabel
              value={AUTHOR}
              control={<Radio />}
              label="Author"
            />
            <FormControlLabel
              value={PUBLISHER}
              control={<Radio />}
              label="Publisher"
            />
          </RadioGroup>
          <Divider sx={{ height: 45, marginRight: 1 }} orientation="vertical" />
          <FormLabel>Sort by</FormLabel>
          <RadioGroup
            onChange={handleOnSortChange}
            sx={{ padding: 1 }}
            defaultValue="relevance"
            row
          >
            <FormControlLabel
              value={RELEVANCE}
              control={<Radio />}
              label="Relevance"
            />
            <FormControlLabel
              value={NEWEST}
              control={<Radio />}
              label="Newest"
            />
          </RadioGroup>
        </FormContainer>
      </FormControl>
    </Box>
  );
};

SearchBar.propTypes = {
  searchBook: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: checkIfLoading(state, searchTypes.GET_SEARCH_BOOK_FETCH),
});

const actionCreators = {
  searchBook: searchActions.searchBook,
};

export default connect(mapStateToProps, actionCreators)(SearchBar);
