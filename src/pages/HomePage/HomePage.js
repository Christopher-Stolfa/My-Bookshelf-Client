import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SearchBar from "../../components/SearchBar/SearchBar";
import { quoteActions } from "../../actions/quoteActions";
import { getSelectedQuoteSelector } from "../../selectors/quoteSelector";
import { GET_RANDOM_QUOTE_SUCCESS } from "../../types/quoteTypes";
import { checkIfLoading } from "../../selectors/uiSelectors";
import getUserSelector from "../../selectors/userSelectors";

const HomeContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxSizing: "border-box",
  borderRadius: "3px",
  width: "100%",
  minHeight: "200px%",
  color: "#333333",
  textAlign: "center",
  padding: "25px",
}));

const LibaryImage = styled("img")(({ theme }) => ({
  minHeight: "300px",
  maxHeight: "500px",
  width: "100%",
}));

const HomePage = ({ getRandomQuote, selectedQuote, isLoading, user }) => {
  useEffect(() => {
    getRandomQuote();
    return () => {};
  }, []);

  return (
    <HomeContainer>
      {user.userData && (
        <Typography fontWeight="bold" variant="h4" gutterBottom>
          Welcome, {user.userData.displayName}
        </Typography>
      )}
      <Typography fontWeight="bold" variant="h4" gutterBottom>
        Discover and save books you love!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Enter a book title, author, category, or publisher and the site will
        pull a list of books related to your search term. Create an account and
        you can keep track of books you find by saving them to your favorites!
      </Typography>
      <SearchBar />
      <Typography
        sx={{ fontSize: "1rem" }}
        fontWeight="bold"
        variant="overline"
        gutterBottom
      >
        {selectedQuote.text}
      </Typography>
      <Typography fontWeight="bold" variant="caption" gutterBottom>
        -{selectedQuote.author}
      </Typography>
      <LibaryImage src={`${process.env.PUBLIC_URL}/library2.svg`} />
    </HomeContainer>
  );
};

HomePage.propTypes = {
  getRandomQuote: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  selectedQuote: PropTypes.shape({
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    userData: PropTypes.shape({
      displayName: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: checkIfLoading(state, GET_RANDOM_QUOTE_SUCCESS),
  selectedQuote: getSelectedQuoteSelector(state),
  user: getUserSelector(state),
});

const actionCreators = {
  getRandomQuote: quoteActions.getRandomQuote,
};

export default connect(mapStateToProps, actionCreators)(HomePage);
