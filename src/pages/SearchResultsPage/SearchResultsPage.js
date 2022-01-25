import React, { useState } from "react";
import { connect } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { searchActions } from "../../actions/searchActions";
import { getSearchSelector } from "../../selectors/searchSelector";
import { checkIfLoading } from "../../selectors/uiSelectors";
import SearchResultCard from "../../components/Cards";
import SearchResultLoading from "../../components/Loaders/SearchResultLoading";
import { searchTypes } from "../../types/searchTypes";
import { SearchResultPagination } from "../../components/Pagination";
import { routes } from "../../config";

const SearchResultsPage = ({
  searchResults: { bookSearchData },
  isLoading,
}) => {
  const initialState = { isSelected: false, book: {} };
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedBook, setSelectedBook] = useState(initialState);

  const handleSelectBook = (book) => {
    setSelectedBook({ isSelected: true, book });
    navigate(`${routes.searchResults}/${book.googleBooksId}`);
  };

  if (location.pathname === routes.searchResults) {
    return (
      <Container component="main">
        {isLoading && (
          <>
            <h1>Loading...</h1>
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
        )}
        {!isLoading && bookSearchData.length > 0 && (
          <>
            <h1>Search results:</h1>
            <Stack spacing={2}>
              {bookSearchData.map((book) => (
                <div key={`${book.googleBooksId}-search-result-div`}>
                  <SearchResultCard
                    key={`${book.googleBooksId}-search-result-card`}
                    book={book}
                    handleSelectBook={handleSelectBook}
                  />
                  <Divider
                    sx={{ marginTop: "8px", marginBottom: "8px" }}
                    key={`${book.googleBooksId}-divider`}
                  />
                </div>
              ))}
            </Stack>
            <SearchResultPagination />
          </>
        )}
        {!isLoading && bookSearchData.length < 1 && <h1>No search results.</h1>}
      </Container>
    );
  } else {
    return (
      <Container component="main">
        <Outlet
          context={[selectedBook, setSelectedBook, initialState]}
        />
      </Container>
    );
  }
};

SearchResultsPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
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
