import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchTypes } from "../../types/searchTypes";
import { searchActions } from "../../actions/searchActions";
import { getSelectedBookSelector } from "../../selectors/searchSelector";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { checkIfLoading } from "../../selectors/uiSelectors";

const BookResultPage = ({ isLoading, searchBookById, selectedBookData }) => {
  const { bookId } = useParams();

  // TODO: Better handling of if the ID does not exist
  const isEmpty = (obj) => {
    if (Object.keys(obj).length === 0) {
      return true;
    } else {
      return false;
    }
  };
  // When a user exists this page or backs out of it, reset SearchResultsPage selectedBook state back to its initial state.
  useEffect(() => {
    if (isEmpty(selectedBookData)) {
      console.log(
        "User accessed this page manually, we must make a fetch with the ID they entered and handle it from there."
      );
      const inputData = { data: JSON.stringify({ googleBooksId: bookId }) };
      searchBookById(inputData);
    } else {
      console.log("User accessed this page through search results");
    }
    return () => {};
  }, []);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
  return (
    <Container>
      {isLoading && isEmpty(selectedBookData) && (
        <Typography component="div" variant="h5">
          Loading...
        </Typography>
      )}
      {!isLoading && !isEmpty(selectedBookData) && (
        <Typography component="div" variant="h5">
          Book ID: {bookId}
        </Typography>
      )}
    </Container>
  );
};

BookResultPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  searchBookById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedBookData: getSelectedBookSelector(state),
  isLoading: checkIfLoading(state, searchTypes.GET_SEARCH_BOOK_BY_ID_FETCH),
});

const actionCreators = {
  searchBookById: searchActions.searchBookById,
};

export default connect(mapStateToProps, actionCreators)(BookResultPage);
