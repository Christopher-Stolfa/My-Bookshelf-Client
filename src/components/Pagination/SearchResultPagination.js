import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { searchTypes } from "../../types/searchTypes";
import { searchActions } from "../../actions/searchActions";
import { getSearchSelector } from "../../selectors/searchSelector";
import { checkIfLoading } from "../../selectors/uiSelectors";
import { routes } from "../../config";

const SearchResultPagination = ({
  searchBook,
  searchResults: { totalItems, searchQuery, currentPage }
}) => {
  const maxPages = 10;
  const pageSize = 10;
  const navigate = useNavigate();
  const [page, setPage] = useState(currentPage);
  const [totalPages, setTotalPages] = useState();

  const handleChange = (e, value) => {
    e.preventDefault();
    setPage(value);
    const inputData = {
      data: JSON.stringify({
        searchQuery,
        maxResults: 10,
        startIndex: (value - 1) * pageSize,
        orderBy: "relevance",
        currentPage: value
      })
    };
    searchBook(inputData);
    navigate(routes.searchResults);
  };

  useEffect(() => {
    let num = Math.floor(totalItems / pageSize);
    if (num < totalItems / pageSize) num = Math.ceil(totalItems / pageSize);
    if (maxPages < num) {
      setTotalPages(maxPages);
    } else {
      setTotalPages(num);
    }

    if (pageSize < totalItems) {
      if (page < 1) {
        setPage(1);
      } else if (page > totalPages) {
        setPage(totalPages);
      }
    }
    window.scrollTo(0, 0);
  }, [totalItems]);
  return (
    <Stack style={{ alignItems: "center" }} spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={totalPages} page={page} onChange={handleChange} />
    </Stack>
  );
};

SearchResultPagination.propTypes = {
  searchBook: PropTypes.func.isRequired,
  searchResults: PropTypes.shape({
    bookSearchData: PropTypes.array,
    totalItems: PropTypes.number,
    searchQuery: PropTypes.string,
    currentPage: PropTypes.number
  }).isRequired
};

const mapStateToProps = state => ({
  searchResults: getSearchSelector(state),
  isLoading: checkIfLoading(state, searchTypes.GET_SEARCH_BOOK_FETCH)
});

const actionCreators = {
  searchBook: searchActions.searchBook
};

export default connect(mapStateToProps, actionCreators)(SearchResultPagination);
