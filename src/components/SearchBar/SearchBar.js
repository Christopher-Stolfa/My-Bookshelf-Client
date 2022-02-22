import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";
import { routes } from "../../config";
import { bookActions } from "../../actions/bookActions";
import { checkIfLoading } from "../../selectors/uiSelectors";
import { bookTypes } from "../../types/bookTypes";

const SUBJECT = "subject:";
const AUTHOR = "inauthor:";
const PUBLISHER = "inpublisher:";

const FormContainer = styled("div")(({ theme }) => ({
  display: "inline-flex",
  position: "relative",
  textAlign: "left",
  margin: 5,
}));

const SearchBar = ({ setInitialSearchState, searchBook, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const navigate = useNavigate();

  const handleOnQueryChange = ({ target: { value } }) => {
    setSearchQuery(value.trim().replaceAll(" ", "+"));
  };

  const handleOnSearchChange = ({ target: { value } }) => {
    setSearchBy(value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const inputData = {
      data: JSON.stringify({
        searchQuery,
        filters: { searchBy: searchBy },
      }),
    };
    setInitialSearchState();
    searchBook(inputData);
    navigate(`${routes.searchResults}/${searchQuery}/1`);
  };

  return (
    <Box component="form" onSubmit={handleOnSubmit}>
      <FormControl>
        <OutlinedInput
          disabled={isLoading}
          onChange={handleOnQueryChange}
          placeholder="Search for books by title, author, or publisher..."
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
        </FormContainer>
      </FormControl>
    </Box>
  );
};

SearchBar.propTypes = {
  setInitialSearchState: PropTypes.func.isRequired,
  searchBook: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: checkIfLoading(state, bookTypes.GET_SEARCH_BOOK_FETCH),
});

const actionCreators = {
  setInitialSearchState: bookActions.setInitialSearchState,
  searchBook: bookActions.searchBook,
};

export default connect(mapStateToProps, actionCreators)(SearchBar);
