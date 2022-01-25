import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";

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
  return <h1>{params.bookId}</h1>;
};

export default BookResultPage;
