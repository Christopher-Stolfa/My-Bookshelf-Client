import React, { useEffect, useLayoutEffect, createRef, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { routes } from "../../../config";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BookIcon from "@mui/icons-material/Book";
import { userActions } from "../../../actions/userActions";
import { getUserSelector } from "../../../selectors/userSelectors";
import { userTypes } from "../../../types/userTypes";
import { checkIfLoading } from "../../../selectors/uiSelectors";
import Rating from "@mui/material/Rating";
import { searchActions } from "../../../actions/searchActions";

const ResultCard = ({
  book,
  user: { loggedIn, favorites },
  userSaveFavoritedBook,
  userRemoveFavoritedBook,
  isDelFavLoading,
  isAddFavLoading,
  setSelectedBook,
}) => {
  const ref = createRef();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    setIsFavorited(
      favorites &&
        favorites.some(
          (favoritedBook) => favoritedBook.googleBooksId === book.googleBooksId
        )
    );
  }, [favorites]);

  useLayoutEffect(() => {
    const { clientWidth, scrollWidth } = ref.current;
    if (clientWidth < scrollWidth) {
      setShowLink(true);
    }
  }, [ref]);

  const handleOnClickMore = () => {
    setShowMore(!showMore);
  };

  const handleOnClickFavorite = () => {
    if (!loggedIn) {
      navigate(routes.signIn);
    } else if (isAddFavLoading || isDelFavLoading) {
      return;
    } else {
      const inputData = { data: JSON.stringify(book) };
      userSaveFavoritedBook(inputData);
    }
  };

  const handleOnClickRemoveFavorite = () => {
    if (!loggedIn) {
      navigate(routes.signIn);
    } else if (isAddFavLoading || isDelFavLoading) {
      return;
    } else {
      const inputData = { data: { bookData: JSON.stringify(book) } };
      userRemoveFavoritedBook(inputData);
    }
  };

  const handleOnClickReading = () => {
    if (!loggedIn) navigate(routes.signIn);
  };

  const handleOnClickFinished = () => {
    if (!loggedIn) navigate(routes.signIn);
  };

  const selectBook = () => {
    setSelectedBook({ message: "Book selected", selectedBookData: book });
    navigate(book.googleBooksId);
  };

  return (
    <Card variant="none" sx={{ display: "flex" }}>
      <div>
        <CardMedia
          component="img"
          sx={{
            width: 128,
            minWidth: 128,
            height: 168,
            minHeight: 168,
            cursor: "pointer",
          }}
          image={book.imageLink}
          alt={book.title}
          onClick={selectBook}
        />
        <Rating
          style={{ marginTop: "8px" }}
          name="half-rating-read"
          defaultValue={book.averageRating}
          precision={0.5}
          readOnly
        />
        <Typography variant="caption" display="block" gutterBottom>
          {book.ratingsCount > 0 && `Ratings: ${book.ratingsCount}`}
        </Typography>
      </div>
      <Box
        ref={ref}
        sx={
          showMore
            ? { display: "flex", flexDirection: "column" }
            : {
                display: "flex",
                flexDirection: "column",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }
        }
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            onClick={selectBook}
            sx={{ cursor: "pointer" }}
            component="div"
            variant="h5"
          >
            {book.title}
          </Typography>
          {book.authors.map((author) => (
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
              {book.description}
            </Typography>
          </span>

          {showLink && (
            <span
              style={{
                cursor: "pointer",
                color: "#0d6aa8",
                textDecoration: "underline",
              }}
              onClick={handleOnClickMore}
            >
              {showMore ? "show less" : "show more"}
            </span>
          )}
        </CardContent>
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
          <IconButton
            onClick={handleOnClickReading}
            aria-label="currently-reading"
          >
            <AutoStoriesIcon />
          </IconButton>
          <IconButton
            onClick={handleOnClickFinished}
            aria-label="finished-reading"
          >
            <BookIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

ResultCard.propTypes = {
  setSelectedBook: PropTypes.func.isRequired,
  isAddFavLoading: PropTypes.bool.isRequired,
  isDelFavLoading: PropTypes.bool.isRequired,
  userSaveFavoritedBook: PropTypes.func.isRequired,
  userRemoveFavoritedBook: PropTypes.func.isRequired,
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
    favorites: PropTypes.arrayOf(
      PropTypes.shape({ googleBooksId: PropTypes.string })
    ),
  }).isRequired,
  book: PropTypes.shape({
    googleBooksId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    publisher: PropTypes.string.isRequired,
    publishedDate: PropTypes.string.isRequired,
    pageCount: PropTypes.number.isRequired,
    averageRating: PropTypes.number,
    ratingsCount: PropTypes.number,
    imageLink: PropTypes.string.isRequired,
    language: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserSelector(state),
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
  setSelectedBook: searchActions.setSelectedBook,
  userSaveFavoritedBook: userActions.userSaveFavoritedBook,
  userRemoveFavoritedBook: userActions.userRemoveFavoritedBook,
};

export default connect(mapStateToProps, actionCreators)(ResultCard);
