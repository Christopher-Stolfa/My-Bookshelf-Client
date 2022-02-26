import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  getSearchResultsSelector,
  getTotalSearchResultsSelector,
} from "../../selectors/bookSelector";
import LoadingCard from "../../components/Loaders/LoadingCard";
import { checkIfLoading } from "../../selectors/uiSelectors";
import { BookCard } from "../../components/Cards/";
import { bookTypes } from "../../types/bookTypes";
import { SortButton } from "../../components/Buttons";

const Results = ({ isLoading, totalItems, searchResults }) => {
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
        <Box sx={{ height: "40px" }} />
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
      <Box>
        {totalItems < 1 ? (
          <Typography variant="h4">No Results</Typography>
        ) : (
          <>
            <Typography variant="h4">Search Results:</Typography>
            <SortButton
              items={searchResults}
              type={bookTypes.SET_SORTED_SEARCH_RESULTS}
            />
            <Stack spacing={2}>
              {searchResults
                .slice(getStartIndex(), getEndIndex())
                .map((book, i) => (
                  <div key={`${book.googleBooksId}-search-result-div-${i}`}>
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
      </Box>
    );
  }
};

Results.propTypes = {
  searchResults: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  totalItems: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  totalItems: getTotalSearchResultsSelector(state),
  searchResults: getSearchResultsSelector(state),
  isLoading: checkIfLoading(state, bookTypes.GET_SEARCH_BOOK_FETCH),
});

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(Results);
