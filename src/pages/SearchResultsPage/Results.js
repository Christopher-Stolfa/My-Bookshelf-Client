import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { searchActions } from "../../actions/searchActions";
import {
  getSearchSelector,
  getResultsTotalSelector
} from "../../selectors/searchSelector";
import { checkIfLoading } from "../../selectors/uiSelectors";
import ResultCard from "../../components/Cards/ResultCard";
import { searchTypes } from "../../types/searchTypes";

const Results = ({ totalItems, searchResults: { bookSearchData } }) => {
  const { pageNum, bookId } = useParams();
  const pageSize = 10;

  const getStartIndex = () => (pageNum - 1) * pageSize;

  const getEndIndex = () => Math.min(getStartIndex() + pageSize, totalItems);

  if (bookId) {
    return <Outlet />;
  } else {
    return (
      <>
        {bookSearchData.length < 1 ? (
          <Typography variant="h4">No Results</Typography>
        ) : (
          <>
            <Typography variant="h4">Search Results:</Typography>
            <Stack spacing={2}>
              {bookSearchData
                .slice(getStartIndex(), getEndIndex())
                .map(book => (
                  <div key={`${book.googleBooksId}-search-result-div`}>
                    <ResultCard
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
        )}
      </>
    );
  }
};

Results.propTypes = {
  searchResults: PropTypes.shape({
    bookSearchData: PropTypes.array.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  totalItems: getResultsTotalSelector(state),
  searchResults: getSearchSelector(state),
  isLoading: checkIfLoading(state, searchTypes.GET_SEARCH_BOOK_FETCH)
});

const actionCreators = {
  searchBook: searchActions.searchBook
};

export default connect(mapStateToProps, actionCreators)(Results);
