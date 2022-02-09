import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { routes } from "../../config";
import PropTypes from "prop-types";
import { checkIfLoading } from "../../selectors/uiSelectors";
import { userActions } from "../../actions/userActions";
import { getUserSelector } from "../../selectors/userSelectors";
import { userTypes } from "../../types/userTypes";
import { useNavigate, useParams } from "react-router-dom";
import {
  getFavoritesSelector,
  getTotalFavoritesSelector,
} from "../../selectors/bookSelector";
import {
  GET_FAVORITED_BOOKS_FETCH,
  GET_SAVE_FAVORITED_BOOK_FETCH,
  GET_REMOVE_FAVORITED_BOOK_FETCH,
} from "../../types/bookTypes";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoadingCard from "../../components/Loaders/LoadingCard";
import { BookCard } from "../../components/Cards/";

const FavoriteBooks = ({
  isAddFavLoading,
  isDelFavLoading,
  isFavoritesLoading,
  userSaveFavoritedBook,
  userRemoveFavoritedBook,
  favorites,
  totalItems,
  user: { loggedIn },
}) => {
  const navigate = useNavigate();
  const { pageNum, bookId } = useParams();
  const pageSize = 10;

  const getStartIndex = () => (pageNum - 1) * pageSize;

  const getEndIndex = () => Math.min(getStartIndex() + pageSize, totalItems);

  if (isFavoritesLoading) {
    return (
      <Box>
        <Typography variant="h4">Loading...</Typography>
        <Stack spacing={2}>
          {Array.from(
            { length: 10 },
            () => new Date().getTime() + Math.random()
          ).map((key, i) => (
            <div key={`${key}-${i}`}>
              <LoadingCard key={`${key}-${i}-favorite-card`} />
              <Divider
                sx={{ marginTop: "8px", marginBottom: "8px" }}
                key={`${key}-${i}-divider`}
              />
            </div>
          ))}
        </Stack>
      </Box>
    );
  } else if (bookId) {
    return <Outlet />;
  } else {
    return (
      <Box>
        {totalItems < 1 ? (
          <Typography variant="h4">No Favorites</Typography>
        ) : (
          <>
            <Typography variant="h4">Favorites:</Typography>
            <Stack spacing={2}>
              {favorites.slice(getStartIndex(), getEndIndex()).map((book) => (
                <div key={`${book.googleBooksId}-favorite-book-div`}>
                  <BookCard
                    key={`${book.googleBooksId}-favorite-book-card`}
                    book={book}
                  />
                  <Divider
                    sx={{ marginTop: "8px", marginBottom: "8px" }}
                    key={`${book.googleBooksId}-favorite-book-divider`}
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

FavoriteBooks.propTypes = {
  isAddFavLoading: PropTypes.bool.isRequired,
  isDelFavLoading: PropTypes.bool.isRequired,
  isFavoritesLoading: PropTypes.bool.isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({ googleBooksId: PropTypes.string })
  ),
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  favorites: getFavoritesSelector(state),
  totalItems: getTotalFavoritesSelector(state),
  user: getUserSelector(state),
  isAddFavLoading: checkIfLoading(state, GET_SAVE_FAVORITED_BOOK_FETCH),
  isDelFavLoading: checkIfLoading(state, GET_REMOVE_FAVORITED_BOOK_FETCH),
  isFavoritesLoading: checkIfLoading(state, GET_FAVORITED_BOOKS_FETCH),
});

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(FavoriteBooks);