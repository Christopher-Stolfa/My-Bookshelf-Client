import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { routes } from "../../config";
import { connect } from "react-redux";
import { searchTypes } from "../../types/searchTypes";
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
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import { bookActions } from "../../actions/bookActions";
import {
  GET_SAVE_FAVORITED_BOOK_FETCH,
  GET_REMOVE_FAVORITED_BOOK_FETCH,
} from "../../types/bookTypes";
import getUserSelector from "../../selectors/userSelectors";
import {
  getFavoritesSelector,
  getSelectedBookSelector,
} from "../../selectors/bookSelector";

const BookResultPage = ({
  saveFavoritedBook,
  removeFavoritedBook,
  isDelFavLoading,
  isAddFavLoading,
  isLoading,
  searchBookById,
  setSelectedBook,
  favorites,
  selectedBook,
  user: { loggedIn },
  searchResults: { bookSearchData },
}) => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [firstRender, setFirstRender] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    return () => {
      console.log("Unmounting");
      setSelectedBook({
        message: "Removed selected book",
        selectedBook: {},
      });
    };
  }, []);

  useEffect(() => {
    if (!firstRender) {
      console.log(
        "Either a book was selected or there is no book data anywhere"
      );
      if (isEmpty(selectedBook)) {
        console.log(`No book with id: ${bookId}`);
        navigate("error-404", { replace: true });
      } else {
        console.log("Book exists, now we check if its in the favorites");

        favorites.find((book) => book.googleBooksId === bookId) &&
          setIsFavorited(true);
      }
    } else {
      console.log("First render, so skip until next call");
    }
  }, [firstRender]);

  useEffect(() => {
    setIsFavorited(
      favorites.some(
        (favoritedBook) =>
          favoritedBook.googleBooksId === selectedBook.googleBooksId
      )
    );
  }, [favorites]);

  useEffect(async () => {
    if (isEmpty(bookSearchData)) {
      console.log("No search data, manually fetch for book data");
      const inputData = { data: JSON.stringify({ googleBooksId: bookId }) };
      await searchBookById(inputData);
    } else {
      console.log(
        "There is search data, try to find the book by ID in search data."
      );
      const book = bookSearchData.find((book) => book.googleBooksId === bookId);
      setSelectedBook({
        message: book ? "Book selected" : "Book doesn't exist",
        selectedBook: book || {},
      });
    }
    setFirstRender(false);
  }, []);

  const handleOnClickFavorite = () => {
    if (!loggedIn) {
      navigate(routes.signIn);
    } else if (isAddFavLoading || isDelFavLoading) {
      return;
    } else {
      const inputData = { data: JSON.stringify(selectedBook) };
      saveFavoritedBook(inputData);
    }
  };

  const handleOnClickRemoveFavorite = () => {
    if (!loggedIn) {
      navigate(routes.signIn);
    } else if (isAddFavLoading || isDelFavLoading) {
      return;
    } else {
      const inputData = {
        data: { bookData: JSON.stringify(selectedBook) },
      };
      removeFavoritedBook(inputData);
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
    <Box>
      <CssBaseline />
      {isLoading && isEmpty(selectedBook) && (
        <Typography component="div" variant="h5">
          Loading...
        </Typography>
      )}
      {!isLoading && !isEmpty(selectedBook) && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ p: 1, display: "inline-block", verticalAlign: "middle" }}>
            <div>
              <Box
                component="img"
                src={selectedBook.imageLink}
                alt={selectedBook.title}
                sx={{
                  width: 128,
                  minWidth: 128,
                  height: 168,
                  minHeight: 168,
                }}
              />
            </div>
            <div>
              <Rating
                style={{ marginTop: "8px" }}
                name="half-rating-read"
                defaultValue={0}
                value={selectedBook.averageRating || 0}
                precision={0.5}
                readOnly
              />
              <Typography variant="caption" display="block" gutterBottom>
                {selectedBook.ratingsCount > 0 &&
                  `Ratings: ${selectedBook.ratingsCount}`}
              </Typography>
            </div>
            <div>
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
            </div>
          </Box>
          <Box sx={{ p: 1, display: "inline-block", verticalAlign: "middle" }}>
            <Typography component="div" variant="h5">
              {selectedBook.title}
            </Typography>
            {selectedBook.authors.map((author) => (
              <Typography
                key={author}
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {author}
              </Typography>
            ))}
            <Typography
              variant="subtitle2"
              color="text.secondary"
              component="div"
            >
              {selectedBook.description}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

BookResultPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  searchBookById: PropTypes.func.isRequired,
  setSelectedBook: PropTypes.func.isRequired,
  saveFavoritedBook: PropTypes.func.isRequired,
  removeFavoritedBook: PropTypes.func.isRequired,
  isAddFavLoading: PropTypes.bool.isRequired,
  isDelFavLoading: PropTypes.bool.isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({ googleBooksId: PropTypes.string })
  ),
  searchResults: PropTypes.shape({
    bookSearchData: PropTypes.array.isRequired,
    selectedBook: PropTypes.shape({
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
  favorites: getFavoritesSelector(state),
  user: getUserSelector(state),
  searchResults: getSearchSelector(state),
  selectedBook: getSelectedBookSelector(state),
  isLoading:
    checkIfLoading(state, searchTypes.GET_SEARCH_BOOK_BY_ID_FETCH) ||
    checkIfLoading(state, searchTypes.GET_SEARCH_BOOK_BY_ID_FETCH),
  isAddFavLoading: checkIfLoading(state, GET_SAVE_FAVORITED_BOOK_FETCH),
  isDelFavLoading: checkIfLoading(state, GET_REMOVE_FAVORITED_BOOK_FETCH),
});

const actionCreators = {
  searchBookById: bookActions.searchBookById,
  setSelectedBook: bookActions.setSelectedBook,
  saveFavoritedBook: bookActions.saveFavoritedBook,
  removeFavoritedBook: bookActions.removeFavoritedBook,
};

export default connect(mapStateToProps, actionCreators)(BookResultPage);
