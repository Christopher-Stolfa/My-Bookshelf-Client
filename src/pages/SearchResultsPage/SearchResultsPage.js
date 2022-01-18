import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { searchActions } from "../../actions/searchActions";
import { getSearchSelector } from "../../selectors/searchSelector";
import { checkIfLoading } from "../../selectors/uiSelectors";
import SearchResultCard from "../../components/Cards/SearchResultCard";
import SearchResultLoading from "../../components/Loaders/SearchResultLoading";
import { searchTypes } from "../../types/searchTypes";

const SearchResultsPage = ({
  searchResults: { bookSearchData },
  isLoading,
}) => {
  if (isLoading) {
    return (
      <>
        <h1>Loading...</h1>
        <Stack spacing={2}>
          {Array.from(
            { length: 10 },
            () => new Date().getTime() + Math.random()
          ).map((key) => (
            <div key={key}>
              <SearchResultLoading key={`${key}-search-result-card`} />
              <Divider
                sx={{ marginTop: "8px", marginBottom: "8px" }}
                key={`${key}-divider`}
              />
            </div>
          ))}
        </Stack>
      </>
    );
  } else if (bookSearchData.length < 1) {
    return <h1>No search results.</h1>;
  } else {
    return (
      <>
        <h1>Search results:</h1>
        <Stack spacing={2}>
          {bookSearchData.map((book) => (
            <div key={`${book.googleBooksId}-search-result-div`}>
              <SearchResultCard
                key={`${book.googleBooksId}-search-result-card`}
                book={book}
              />
              <Divider
                sx={{ marginTop: "8px", marginBottom: "8px" }}
                key={`${book.googleBooksId}-divider`}
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
  searchResults: PropTypes.shape({
    bookSearchData: PropTypes.array.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  searchResults: getSearchSelector(state),
  isLoading: checkIfLoading(state, searchTypes.GET_SEARCH_BOOK_FETCH),
});

const actionCreators = {
  searchBook: searchActions.searchBook,
};

export default connect(mapStateToProps, actionCreators)(SearchResultsPage);
