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
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BookIcon from "@mui/icons-material/Book";
import { userActions } from "../../../actions/userActions";
import { getUserSelector } from "../../../selectors/userSelectors";
import colors from "../../../themes/colors";

const SearchResultCard = ({
  book,
  user: { loggedIn, favorites },
  userSaveFavoritedBook,
  userRemoveFavoritedBook
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
          favoritedBook => favoritedBook.googleBooksId === book.googleBooksId
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
    } else {
      const inputData = { data: JSON.stringify(book) };
      userSaveFavoritedBook(inputData);
    }
  };

  const handleOnClickRemoveFavorite = () => {
    if (!loggedIn) {
      navigate(routes.signIn);
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

  return (
    <Card variant="none" sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 128, minWidth: 128, height: 168, minHeight: 168 }}
        image={book.imageLink}
        alt={book.title}
      />
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
                textOverflow: "ellipsis"
              }
        }
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {book.title}
          </Typography>
          {book.authors.map(author => (
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
                textDecoration: "underline"
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
              <StarIcon style={{ color: colors.gold }} />
            </IconButton>
          ) : (
            <IconButton
              onClick={handleOnClickFavorite}
              aria-label="favorite-item"
            >
              <StarBorderIcon />
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

SearchResultCard.propTypes = {
  userSaveFavoritedBook: PropTypes.func.isRequired,
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
    favorites: PropTypes.arrayOf(
      PropTypes.shape({ googleBooksId: PropTypes.string })
    )
  }).isRequired,
  book: PropTypes.shape({
    googleBooksId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    publisher: PropTypes.string.isRequired,
    publishedDate: PropTypes.string.isRequired,
    pageCount: PropTypes.number.isRequired,
    averageRating: PropTypes.number.isRequired,
    ratingsCount: PropTypes.number.isRequired,
    imageLink: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  user: getUserSelector(state)
});

const actionCreators = {
  userSaveFavoritedBook: userActions.userSaveFavoritedBook,
  userRemoveFavoritedBook: userActions.userRemoveFavoritedBook
};

export default connect(mapStateToProps, actionCreators)(SearchResultCard);