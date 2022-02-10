import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import DirectionsIcon from "@mui/icons-material/Directions";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SearchBar from "../../components/SearchBar/SearchBar";
import { quoteActions } from "../../actions/quoteActions";
import { getSelectedQuoteSelector } from "../../selectors/quoteSelector";
import { GET_RANDOM_QUOTE_SUCCESS } from "../../types/quoteTypes";
import { checkIfLoading } from "../../selectors/uiSelectors";

const Background = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxSizing: "border-box",
  borderRadius: "3px",
  width: "100%",
  minHeight: "200px%",
  backgroundColor: "#E6E7E8",
  color: "#333333",
  textAlign: "center",
  padding: "40px 15px 500px",
  // backgroundImage: `url(${process.env.PUBLIC_URL}/library.svg)`,
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}));
const HomePage = ({ getRandomQuote, selectedQuote, isLoading }) => {
  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <Background>
      <Box>
        <Typography fontWeight="bold" variant="h4" gutterBottom>
          Discover and save books you love!
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Enter a book title, author, category, or publisher and the site will
          pull a list of books related to your search term. Create an account
          and you can keep track of books you find by saving them to your
          favorites!
        </Typography>
        <SearchBar />
        <Typography fontWeight="bold" variant="h5" gutterBottom>
          {selectedQuote.text}
        </Typography>
        <Typography fontWeight="bold" variant="caption" gutterBottom>
          -{selectedQuote.author}
        </Typography>
      </Box>
    </Background>
  );
};

HomePage.propTypes = {
  getRandomQuote: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  selectedQuote: PropTypes.shape({
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: checkIfLoading(state, GET_RANDOM_QUOTE_SUCCESS),
  selectedQuote: getSelectedQuoteSelector(state),
});

const actionCreators = {
  getRandomQuote: quoteActions.getRandomQoute,
};

export default connect(mapStateToProps, actionCreators)(HomePage);
