import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { CustomPagination } from "../../components/Pagination";
import { bookActions } from "../../actions/bookActions";
import { getTotalSearchResultsSelector } from "../../selectors/bookSelector";

const SearchResults = ({ totalItems, searchBook }) => {
  const { searchQuery, bookId } = useParams();

  // When searchResults route is hit, perform a search query
  // useEffect(() => {
  //   const inputData = {
  //     data: JSON.stringify({
  //       searchQuery,
  //       orderBy: "relevance",
  //     }),
  //   };
  //   searchBook(inputData);
  // }, [searchQuery]);

  return (
    <>
      <Outlet />
      {!bookId && <CustomPagination totalItems={totalItems} />}
    </>
  );
};

SearchResults.propTypes = {
  totalItems: PropTypes.number.isRequired,
  searchBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  totalItems: getTotalSearchResultsSelector(state),
});

const actionCreators = {
  searchBook: bookActions.searchBook,
};

export default connect(mapStateToProps, actionCreators)(SearchResults);
