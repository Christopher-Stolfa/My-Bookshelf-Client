import React, { useEffect } from "react";
import { connect } from "react-redux";
import { routes } from "../../config";
import PropTypes from "prop-types";
import { checkIfLoading } from "../../selectors/uiSelectors";
import { userActions } from "../../actions/userActions";
import { getUserSelector } from "../../selectors/userSelectors";
import { userTypes } from "../../types/userTypes";
import { useNavigate } from "react-router-dom";

const FavoritesPage = ({
  isAddFavLoading,
  isDelFavLoading,
  userSaveFavoritedBook,
  userRemoveFavoritedBook,
  user: { loggedIn, favorites },
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    !loggedIn && navigate(routes.sign);
  }, [loggedIn]);

  return <h1>favorites page</h1>;
};

FavoritesPage.propTypes = {
  isAddFavLoading: PropTypes.bool.isRequired,
  isDelFavLoading: PropTypes.bool.isRequired,
  userSaveFavoritedBook: PropTypes.func.isRequired,
  userRemoveFavoritedBook: PropTypes.func.isRequired,
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
    favorites: PropTypes.arrayOf(
      PropTypes.shape({ googleBooksId: PropTypes.string })
    ),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserSelector(state),
  isAddFavLoading: checkIfLoading(
    state,
    userTypes.GET_SAVE_FAVORITED_BOOK_FETCH
  ),
  isDelFavLoading: checkIfLoading(
    state,
    userTypes.GET_REMOVE_FAVORITED_BOOK_FETCH
  ),
});

const actionCreators = {
  userSaveFavoritedBook: userActions.userSaveFavoritedBook,
  userRemoveFavoritedBook: userActions.userRemoveFavoritedBook,
};

export default connect(mapStateToProps, actionCreators)(FavoritesPage);
