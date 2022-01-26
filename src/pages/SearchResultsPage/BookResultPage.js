import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const BookResultPage = (props) => {
  const params = useParams();
  const [selectedBook, setSelectedBook, initialState] = useOutletContext();

  // When a user exists this page or backs out of it, reset SearchResultsPage selectedBook state back to its initial state.
  useEffect(() => {
    if (!selectedBook.isSelected) {
      console.log(
        "User accessed this page manually, we must make a fetch with the ID they entered and handle it from there."
      );
    } else {
      console.log("User accessed this page through search results");
    }
    return () => {
      setSelectedBook({ initialState });
    };
  }, []);

  // TODO: Make it check if loading alongside isSelected
  return (
    <Container>
      {!selectedBook.isSelected && (
        <Typography component="div" variant="h3">
          No book selected
        </Typography>
      )}
      {selectedBook.isSelected && (
        <Typography component="div" variant="h3">
          Book ID: {params.bookId}
        </Typography>
      )}
    </Container>
  );
};

export default BookResultPage;
