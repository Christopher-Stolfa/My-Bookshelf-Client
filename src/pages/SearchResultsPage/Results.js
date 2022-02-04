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
import LoadingCard from "../../components/Loaders/LoadingCard";
import { checkIfLoading } from "../../selectors/uiSelectors";
import { BookCard } from "../../components/Cards/";
import { searchTypes } from "../../types/searchTypes";

const Results = ({
  isLoading,
  totalItems,
  searchResults: { bookSearchData }
}) => {
  const { pageNum, bookId } = useParams();
  const pageSize = 10;

  const getStartIndex = () => (pageNum - 1) * pageSize;

  const getEndIndex = () => Math.min(getStartIndex() + pageSize, totalItems);

  if (bookId) {
    return <Outlet />;
  } else if (isLoading) {
    return (
      <Box>
        <Typography variant="h4">Loading...</Typography>
        <Stack spacing={2}>
          {Array.from(
            { length: 10 },
            () => new Date().getTime() + Math.random()
          ).map((key, i) => (
            <div key={`${key}-${i}`}>
              <LoadingCard key={`${key}-${i}-search-result-card`} />
              <Divider
                sx={{ marginTop: "8px", marginBottom: "8px" }}
                key={`${key}-${i}-divider`}
              />
            </div>
          ))}
        </Stack>
      </Box>
    );
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
                    <BookCard
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
