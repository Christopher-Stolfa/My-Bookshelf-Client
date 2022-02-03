import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import { userActions } from "../../actions/userActions";
import { getUserSelector } from "../../selectors/userSelectors";

const SearchResultsPage = ({ getFavorites, user: { loggedIn } }) => {
  React.useEffect(() => {
    loggedIn && getFavorites();
  }, [loggedIn]);
  return <Outlet />;
};

SearchResultsPage.propTypes = {
  getFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: getUserSelector(state)
});

const actionCreators = {
  getFavorites: userActions.userGetFavoritedBooks
};

export default connect(mapStateToProps, actionCreators)(SearchResultsPage);
