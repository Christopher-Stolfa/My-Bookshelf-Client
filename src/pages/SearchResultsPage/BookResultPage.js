import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { routes } from "../../config";
import { connect } from "react-redux";
import { searchTypes } from "../../types/searchTypes";
import { searchActions } from "../../actions/searchActions";
import { getSearchSelector } from "../../selectors/searchSelector";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BookIcon from "@mui/icons-material/Book";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { checkIfLoading } from "../../selectors/uiSelectors";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import { userActions } from "../../actions/userActions";
import { userTypes } from "../../types/userTypes";
import getUserSelector from "../../selectors/userSelectors";

const BookResultPage = ({
  userSaveFavoritedBook,
  userRemoveFavoritedBook,
  isDelFavLoading,
  isAddFavLoading,
  isLoading,
  searchBookById,
  setSelectedBook,
  user: { loggedIn, favorites },
  searchResults: { selectedBookData, bookSearchData },
}) => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    setIsFavorited(
      favorites &&
        favorites.some(
          (favoritedBook) =>
            favoritedBook.googleBooksId === selectedBookData.googleBooksId
        )
    );
  }, [favorites]);

  // When a user exists this page or backs out of it, reset SearchResultsPage selectedBook state back to its initial state.
  useEffect(() => {
    if (isEmpty(bookSearchData)) {
      const inputData = { data: JSON.stringify({ googleBooksId: bookId }) };
      searchBookById(inputData);
    }
    return () => {
      setSelectedBook({
        message: "Removed selected book",
        selectedBookData: {},
      });
    };
  }, []);

  const handleOnClickFavorite = () => {
    if (!loggedIn) {
      navigate(routes.signIn);
    } else if (isAddFavLoading || isDelFavLoading) {
      return;
    } else {
      const inputData = { data: JSON.stringify(selectedBookData) };
      userSaveFavoritedBook(inputData);
    }
  };

  const handleOnClickRemoveFavorite = () => {
    if (!loggedIn) {
      navigate(routes.signIn);
    } else if (isAddFavLoading || isDelFavLoading) {
      return;
    } else {
      const inputData = {
        data: { bookData: JSON.stringify(selectedBookData) },
      };
      userRemoveFavoritedBook(inputData);
    }
  };

  // TODO: Better handling of if the ID does not exist
  const isEmpty = (obj) => {
    if (Object.keys(obj).length === 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Container>
      {isLoading && isEmpty(selectedBookData) && (
        <Typography component="div" variant="h5">
          Loading...
        </Typography>
      )}
      {!isLoading && !isEmpty(selectedBookData) && (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={selectedBookData.imageLink}
            alt={selectedBookData.title}
            sx={{ width: 128, minWidth: 128, height: 168, minHeight: 168 }}
          />
          <Rating
            style={{ marginTop: "8px" }}
            name="half-rating-read"
            defaultValue={selectedBookData.averageRating}
            precision={0.5}
            readOnly
          />
          <Typography variant="caption" display="block" gutterBottom>
            {selectedBookData.ratingsCount > 0 &&
              `Ratings: ${selectedBookData.ratingsCount}`}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {selectedBookData.title}
              </Typography>
              {selectedBookData.authors.map((author) => (
                <Typography
                  key={author}
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {author}
                </Typography>
              ))}
              <span>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  {selectedBookData.description}
                </Typography>
              </span>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              {favorites && isFavorited ? (
                <IconButton
                  onClick={handleOnClickRemoveFavorite}
                  aria-label="favorite-item"
                >
                  <FavoriteIcon color="secondary" />
                </IconButton>
              ) : (
                <IconButton
                  onClick={handleOnClickFavorite}
                  aria-label="favorite-item"
                >
                  <FavoriteBorderIcon />
                </IconButton>
              )}
              <IconButton aria-label="currently-reading">
                <AutoStoriesIcon />
              </IconButton>
              <IconButton aria-label="finished-reading">
                <BookIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
};

BookResultPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  searchBookById: PropTypes.func.isRequired,
  setSelectedBook: PropTypes.func.isRequired,
  userSaveFavoritedBook: PropTypes.func.isRequired,
  userRemoveFavoritedBook: PropTypes.func.isRequired,
  isAddFavLoading: PropTypes.bool.isRequired,
  isDelFavLoading: PropTypes.bool.isRequired,
  searchResults: PropTypes.shape({
    bookSearchData: PropTypes.array.isRequired,
    selectedBookData: PropTypes.shape({
      googleBooksId: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      authors: PropTypes.arrayOf(PropTypes.string),
      publisher: PropTypes.string,
      publishedDate: PropTypes.string,
      pageCount: PropTypes.number,
      averageRating: PropTypes.number,
      ratingsCount: PropTypes.number,
      imageLink: PropTypes.string,
      language: PropTypes.string,
      categories: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserSelector(state),
  searchResults: getSearchSelector(state),
  isLoading: checkIfLoading(state, searchTypes.GET_SEARCH_BOOK_BY_ID_FETCH),
  isAddFavLoading: checkIfLoading(
    state,
    userTypes.GET_SAVE_FAVORITED_BOOK_FETCH
  ),
  isDelFavLoading: checkIfLoading(
    state,
    userTypes.GET_REMOVE_FAVORITED_BOOK_FETCH
  ),
});

const actionCreators = {
  searchBookById: searchActions.searchBookById,
  setSelectedBook: searchActions.setSelectedBook,
  userSaveFavoritedBook: userActions.userSaveFavoritedBook,
  userRemoveFavoritedBook: userActions.userRemoveFavoritedBook,
};

export default connect(mapStateToProps, actionCreators)(BookResultPage);
