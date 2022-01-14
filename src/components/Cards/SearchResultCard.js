import React, { useLayoutEffect, createRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BookIcon from "@mui/icons-material/Book";
import Chip from "@mui/material/Chip";

const SearchResultCard = ({ book }) => {
  const ref = createRef();
  const [showMore, setShowMore] = useState(false);
  const [showLink, setShowLink] = useState(false);

  useLayoutEffect(() => {
    if (ref.current.clientWidth < ref.current.scrollWidth) {
      setShowLink(true);
    }
  }, [ref]);

  const onClickMore = () => {
    setShowMore(!showMore);
  };

  return (
    <Card variant="none" sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 128, minWidth: 128, height: 168, minHeight: 168 }}
        image={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail}
        alt={book.volumeInfo.title}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent
          ref={ref}
          sx={
            showMore
              ? { flex: "1 0 auto" }
              : {
                  flex: "1 0 auto",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }
          }
        >
          <Typography component="div" variant="h5">
            {book.volumeInfo.title}
          </Typography>
          {book.volumeInfo.authors.map((author) => (
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
            {book.volumeInfo.description}
          </Typography>
          {showLink && (
            <span
              style={{
                cursor: "pointer",
                color: "#0d6aa8",
                textDecoration: "underline",
              }}
              onClick={onClickMore}
            >
              {showMore ? "show less" : "show more"}
            </span>
          )}
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <Chip icon={<WatchLaterIcon />} label="Add to watch list" />
          <Chip icon={<AutoStoriesIcon />} label="Mark as currently reading" />
          <Chip icon={<BookIcon />} label="Mark finished reading" />
        </Box>
      </Box>
    </Card>
  );
};

export default SearchResultCard;
