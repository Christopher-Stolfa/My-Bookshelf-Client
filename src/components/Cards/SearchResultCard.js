import React, { useLayoutEffect, createRef, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { routes } from "../../config";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BookIcon from "@mui/icons-material/Book";
import { userActions } from "../../actions/userActions";
import { getUserSelector } from "../../selectors/userSelectors";

const SearchResultCard = ({ book, user }) => {
  const ref = createRef();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [showLink, setShowLink] = useState(false);
  useLayoutEffect(() => {
    const { clientWidth, scrollWidth } = ref.current;
    if (clientWidth < scrollWidth) {
      setShowLink(true);
    }
  }, [ref]);

  const handleOnClickMore = () => {
    setShowMore(!showMore);
  };

  const handleOnClickWatch = () => {
    if (!user.loggedIn) navigate(routes.signIn);
  };

  const handleOnClickReading = () => {
    if (!user.loggedIn) navigate(routes.signIn);
  };

  const handleOnClickFinished = () => {
    if (!user.loggedIn) navigate(routes.signIn);
  };

  return (
    <Card variant="none" sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 128, minWidth: 128, height: 168, minHeight: 168 }}
        image={
          book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
        }
        alt={book.volumeInfo.title}
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
                textOverflow: "ellipsis",
              }
        }
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {book.volumeInfo.title}
          </Typography>
          {book.volumeInfo.authors &&
            book.volumeInfo.authors.map((author) => (
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
              {book.volumeInfo.description && book.volumeInfo.description}
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
          <IconButton onClick={handleOnClickWatch} aria-label="save-item">
            <StarBorderIcon />
          </IconButton>
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
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserSelector(state),
});

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(SearchResultCard);
