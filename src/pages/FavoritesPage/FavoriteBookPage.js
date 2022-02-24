import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { routes } from "../../config";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { checkIfLoading } from "../../selectors/uiSelectors";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import CircleIcon from "@mui/icons-material/Circle";
import PercentIcon from "@mui/icons-material/Percent";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { bookActions } from "../../actions/bookActions";
import TextField from "@mui/material/TextField";
import { bookTypes } from "../../types/bookTypes";
import getUserSelector from "../../selectors/userSelectors";
import {
  getFavoritesSelector,
  getSelectedBookSelector,
} from "../../selectors/bookSelector";
import FavoriteBookNotes from "./FavoriteBookNotes";

const FavoriteBookPage = ({
  setInitialState,
  getFavoritedBook,
  saveFavoritedBook,
  removeFavoritedBook,
  isDelFavLoading,
  isAddFavLoading,
  isLoading,
  setSelectedBook,
  favorites,
  selectedBook,
  user: { loggedIn },
}) => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [isFavorited, setIsFavorited] = useState(true);

  useEffect(() => {
    setIsFavorited(
      favorites &&
        favorites.some(
          (favoritedBook) =>
            favoritedBook.googleBooksId === selectedBook.googleBooksId
        )
    );
  }, [favorites]);

  // When a user exits this page or backs out of it, reset SearchResultsPage selectedBook state back to its initial state.
  useEffect(() => {
    const setFavoriteBook = async () => {
      const book = favorites.find((book) => book.googleBooksId === bookId);
      if (book) {
        setSelectedBook({ message: "Book selected", selectedBook: book });
      } else {
        const inputData = {
          data: { bookId },
        };
        getFavoritedBook(inputData);
      }
    };
    setFavoriteBook();
    return () => {
      setInitialState();
    };
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {!isEmpty(selectedBook) && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ p: 1, display: "inline-block", verticalAlign: "middle" }}>
            <Box>
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
            </Box>
            <Box>
              <Rating
                style={{ marginTop: "8px" }}
                name="half-rating-read"
                defaultValue={0}
                value={selectedBook.averageRating || 0}
                precision={0.5}
                readOnly
              />
              <Box sx={{ minWidth: "inherit" }}>
                <Box
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                >
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
                </Box>
                <Typography
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                  variant="caption"
                  gutterBottom
                >
                  {selectedBook.ratingsCount > 0 &&
                    `Ratings: ${selectedBook.ratingsCount}`}
                </Typography>
              </Box>
            </Box>
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
              color="text.primary"
              component="div"
            >
              {selectedBook.description}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <CircleIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Status: Not Reading/Reading
              </Typography>
              <Button>toggle</Button>
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <PercentIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                style={{ width: "30px" }}
                id="input-with-sx"
                variant="standard"
              />
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                style={{ lineHeight: 2 }}
              >
                of the book completed
              </Typography>
              <Button>save</Button>
            </Box>
            <FavoriteBookNotes />
          </Box>
        </Box>
      )}
    </Box>
  );
};

FavoriteBookPage.propTypes = {
  setInitialState: PropTypes.func.isRequired,
  getFavoritedBook: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setSelectedBook: PropTypes.func.isRequired,
  saveFavoritedBook: PropTypes.func.isRequired,
  removeFavoritedBook: PropTypes.func.isRequired,
  isAddFavLoading: PropTypes.bool.isRequired,
  isDelFavLoading: PropTypes.bool.isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({ googleBooksId: PropTypes.string })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  favorites: getFavoritesSelector(state),
  user: getUserSelector(state),
  selectedBook: getSelectedBookSelector(state),
  isLoading: checkIfLoading(state, bookTypes.GET_FAVORITED_BOOK_FETCH),
  isAddFavLoading: checkIfLoading(
    state,
    bookTypes.GET_SAVE_FAVORITED_BOOK_FETCH
  ),
  isDelFavLoading: checkIfLoading(
    state,
    bookTypes.GET_REMOVE_FAVORITED_BOOK_FETCH
  ),
});

const actionCreators = {
  getFavoritedBook: bookActions.getFavoritedBook,
  setSelectedBook: bookActions.setSelectedBook,
  saveFavoritedBook: bookActions.saveFavoritedBook,
  removeFavoritedBook: bookActions.removeFavoritedBook,
  setInitialState: bookActions.setInitialSelectedBookState,
};

export default connect(mapStateToProps, actionCreators)(FavoriteBookPage);
