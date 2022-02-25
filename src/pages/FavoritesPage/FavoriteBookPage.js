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
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
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

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: green[600],
    "&:hover": {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: green[600],
  },
}));

const FavoriteBookPage = ({
  setInitialState,
  getFavoritedBook,
  saveFavoritedBook,
  removeFavoritedBook,
  toggleReadingBook,
  isLoading,
  isLoadingNoSpinner,
  setSelectedBook,
  setBookProgress,
  favorites,
  selectedBook,
  user: { loggedIn },
}) => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [isFavorited, setIsFavorited] = useState(true);
  const [progress, setProgress] = useState(selectedBook.progress || 0);
  const [notValid, setNotValid] = useState(false);

  useEffect(() => {
    setProgress(selectedBook.progress);
  }, [selectedBook.progress]);

  useEffect(() => {
    if (isNaN(progress) || progress < 0 || progress > 100) {
      setNotValid(true);
    } else {
      setNotValid(false);
    }
  }, [progress]);

  useEffect(() => {
    !selectedBook.isReading && setProgress(0);
  }, [selectedBook.isReading]);

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

  const handleBookProgress = ({ target: { value } }) => {
    if (!loggedIn) {
      navigate(routes.signIn);
    } else if (!isLoadingNoSpinner) {
      setProgress(value);
    }
  };

  const handleBookProgressSave = (e) => {
    e.preventDefault();
    const inputData = {
      data: JSON.stringify({
        googleBooksId: selectedBook.googleBooksId,
        progress,
      }),
    };
    setBookProgress(inputData);
  };

  const handleOnClickFavorite = () => {
    if (!loggedIn) {
      navigate(routes.signIn);
    } else if (!isLoadingNoSpinner) {
      const inputData = { data: JSON.stringify(selectedBook) };
      setIsFavorited(true);
      saveFavoritedBook(inputData);
    }
  };

  const handleOnClickRemoveFavorite = () => {
    if (!loggedIn) {
      navigate(routes.signIn);
    } else if (!isLoadingNoSpinner) {
      const inputData = {
        data: { bookData: JSON.stringify(selectedBook) },
      };
      setIsFavorited(false);
      removeFavoritedBook(inputData);
    }
  };

  const handleStatusSwitch = (e, checked) => {
    if (!loggedIn) {
      navigate(routes.signIn);
    } else if (!isLoadingNoSpinner) {
      const inputData = {
        data: JSON.stringify({
          googleBooksId: selectedBook.googleBooksId,
          isReading: checked,
          progress: checked ? progress : 0,
        }),
      };
      toggleReadingBook(inputData);
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
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    checked={isFavorited ? selectedBook.isReading : false}
                    onChange={handleStatusSwitch}
                    control={<GreenSwitch />}
                    label={selectedBook.isReading ? "Reading" : "Not Reading"}
                    labelPlacement="end"
                  />
                </FormGroup>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <PercentIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                style={{ width: "30px" }}
                id="input-with-sx"
                variant="standard"
                disabled={selectedBook.isReading ? false : true}
                onChange={handleBookProgress}
                value={progress}
                error={notValid}
              />
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                style={{ lineHeight: 2 }}
              >
                of the book completed
              </Typography>
              <Button onClick={handleBookProgressSave}>save</Button>
            </Box>
            <FavoriteBookNotes />
          </Box>
        </Box>
      )}
    </Box>
  );
};

FavoriteBookPage.propTypes = {
  setBookProgress: PropTypes.func.isRequired,
  toggleReadingBook: PropTypes.func.isRequired,
  setInitialState: PropTypes.func.isRequired,
  getFavoritedBook: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingNoSpinner: PropTypes.bool.isRequired,
  setSelectedBook: PropTypes.func.isRequired,
  saveFavoritedBook: PropTypes.func.isRequired,
  removeFavoritedBook: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({ googleBooksId: PropTypes.string })
  ).isRequired,
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
    isReading: PropTypes.bool,
    progress: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  favorites: getFavoritesSelector(state),
  user: getUserSelector(state),
  selectedBook: getSelectedBookSelector(state),
  isLoading:
    checkIfLoading(state, bookTypes.GET_FAVORITED_BOOKS_FETCH) ||
    checkIfLoading(state, bookTypes.GET_FAVORITED_BOOK_FETCH),
  isLoadingNoSpinner:
    checkIfLoading(state, bookTypes.GET_SAVE_FAVORITED_BOOK_FETCH) ||
    checkIfLoading(state, bookTypes.GET_REMOVE_FAVORITED_BOOK_FETCH),
});

const actionCreators = {
  getFavoritedBook: bookActions.getFavoritedBook,
  setSelectedBook: bookActions.setSelectedBook,
  saveFavoritedBook: bookActions.saveFavoritedBook,
  removeFavoritedBook: bookActions.removeFavoritedBook,
  setInitialState: bookActions.setInitialSelectedBookState,
  toggleReadingBook: bookActions.toggleReadingBook,
  setBookProgress: bookActions.setBookProgress,
};

export default connect(mapStateToProps, actionCreators)(FavoriteBookPage);
