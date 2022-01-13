import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { bookActions } from "../../actions/bookActions";
import { getBookSelector } from "../../selectors/bookSelector";
import SearchResultCard from "../../components/Cards/SearchResultCard";

const SearchResultsPage = ({ books: { bookSearchData } }) => {
  if (bookSearchData.length < 1) {
    return <h1>No search results.</h1>;
  } else {
    return (
      <>
        <h1>Search results:</h1>
        <Stack spacing={2}>
          {bookSearchData.map((book) => (
            <div key={`${book.id}-search-result-div`}>
              <SearchResultCard
                key={`${book.id}-search-result-card`}
                book={book}
              />
              <Divider
                sx={{ marginTop: "8px", marginBottom: "8px" }}
                key={`${book.id}-divider`}
              />
            </div>
          ))}
        </Stack>
      </>
    );
  }
};

SearchResultsPage.propTypes = {
  searchBook: PropTypes.func.isRequired,
  books: PropTypes.shape({
    bookSearchData: PropTypes.array.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  books: getBookSelector(state),
});

const actionCreators = {
  searchBook: bookActions.searchBook,
};

export default connect(mapStateToProps, actionCreators)(SearchResultsPage);
