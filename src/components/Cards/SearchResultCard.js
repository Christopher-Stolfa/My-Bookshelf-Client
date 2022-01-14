import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const SearchResultCard = ({ book }) => {
  const theme = useTheme();

  return (
    <Card variant="none" sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 128, minWidth: 128, height: 168, minHeight: 168 }}
        image={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail}
        alt={book.volumeInfo.title}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
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
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {book.volumeInfo.description}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
      </Box>
    </Card>
  );
};

export default SearchResultCard;
