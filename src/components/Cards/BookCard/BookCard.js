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
import Rating from "@mui/material/Rating";
import { bookActions } from "../../../actions/bookActions";
import { getUserSelector } from "../../../selectors/userSelectors";
import { bookTypes } from "../../../types/bookTypes";
import { checkIfLoading } from "../../../selectors/uiSelectors";
import { getFavoritesSelector } from "../../../selectors/bookSelector";

const BookCard = ({
  favorites,
  book,
  user: { loggedIn },
  saveFavoritedBook,
  removeFavoritedBook,
  isDelFavLoading,
  isAddFavLoading,
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
      saveFavoritedBook(inputData);
    }
  };

  const handleOnClickRemoveFavorite = () => {
    if (!loggedIn) {
      navigate(routes.signIn);
    } else if (isAddFavLoading || isDelFavLoading) {
      return;
    } else {
      const inputData = { data: { bookData: JSON.stringify(book) } };
      removeFavoritedBook(inputData);
    }
  };

  const selectBook = () => {
    navigate(book.googleBooksId);
  };

  return (
    <Card variant="none" sx={{ display: "flex", backgroundColor: "#FDF4E7" }}>
      <Box>
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

        <Box sx={{ minWidth: "inherit" }}>
          <Box
            style={{
              display: "inline-block",
              verticalAlign: "middle",
            }}
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
            {book.ratingsCount > 0 && `Ratings: ${book.ratingsCount}`}
          </Typography>
        </Box>
      </Box>
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
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {book.publishedDate}
          </Typography>
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
      </Box>
    </Card>
  );
};

BookCard.propTypes = {
  isAddFavLoading: PropTypes.bool.isRequired,
  isDelFavLoading: PropTypes.bool.isRequired,
  saveFavoritedBook: PropTypes.func.isRequired,
  removeFavoritedBook: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({ googleBooksId: PropTypes.string })
  ),
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
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
  favorites: getFavoritesSelector(state),
  user: getUserSelector(state),
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
  saveFavoritedBook: bookActions.saveFavoritedBook,
  removeFavoritedBook: bookActions.removeFavoritedBook,
};

export default connect(mapStateToProps, actionCreators)(BookCard);
