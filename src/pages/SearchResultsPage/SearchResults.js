import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { searchActions } from "../../actions/searchActions";
import { checkIfLoading } from "../../selectors/uiSelectors";
import SearchResultLoading from "../../components/Loaders/SearchResultLoading";
import { searchTypes } from "../../types/searchTypes";
import { SearchResultPagination } from "../../components/Pagination";

const SearchResults = ({ isLoading, searchBook }) => {
  const { searchQuery, bookId } = useParams();

  // When searchResults route is hit, perform a search query
  useEffect(() => {
    const inputData = {
      data: JSON.stringify({
        searchQuery,
        orderBy: "relevance"
      })
    };
    searchBook(inputData);
  }, [searchQuery]);

  return (
    <Box>
      {isLoading ? (
        <>
          <Typography variant="h4">Loading...</Typography>
          <Stack spacing={2}>
            {Array.from(
              { length: 10 },
              () => new Date().getTime() + Math.random()
            ).map((key, i) => (
              <div key={`${key}-${i}`}>
                <SearchResultLoading key={`${key}-${i}-search-result-card`} />
                <Divider
                  sx={{ marginTop: "8px", marginBottom: "8px" }}
                  key={`${key}-${i}-divider`}
                />
              </div>
            ))}
          </Stack>
        </>
      ) : (
        <>
          <Outlet />
          {!bookId && <SearchResultPagination />}
        </>
      )}
    </Box>
  );
};

SearchResults.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  searchBook: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoading: checkIfLoading(state, searchTypes.GET_SEARCH_BOOK_FETCH)
});

const actionCreators = {
  searchBook: searchActions.searchBook
};

export default connect(mapStateToProps, actionCreators)(SearchResults);
