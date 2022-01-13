import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { bookActions } from "../../actions/bookActions";
import { getBookSelector } from "../../selectors/bookSelector";

const SearchResultsPage = props => {
  return <h1>Search Results Page</h1>;
};

SearchResultsPage.propTypes = {
  searchBook: PropTypes.func.isRequired,
  books: PropTypes.shape({
    bookSearchData: PropTypes.array.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  books: getBookSelector(state)
});

const actionCreators = {
  searchBook: bookActions.searchBook
};

export default connect(mapStateToProps, actionCreators)(SearchResultsPage);
