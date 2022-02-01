import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { checkIfLoading } from "../../selectors/uiSelectors";
import { userActions } from "../../actions/userActions";
import { getUserSelector } from "../../selectors/userSelectors";
import { userTypes } from "../../types/userTypes";

const FavoritesPage = props => {
  return <h1>favorites page</h1>;
};

FavoritesPage.propTypes = {
    
};

const mapStateToProps = state => ({
  user: getUserSelector(state),
  isAddFavLoading: checkIfLoading(
    state,
    userTypes.GET_SAVE_FAVORITED_BOOK_FETCH
  ),
  isDelFavLoading: checkIfLoading(
    state,
    userTypes.GET_REMOVE_FAVORITED_BOOK_FETCH
  )
});

const actionCreators = {
  userSaveFavoritedBook: userActions.userSaveFavoritedBook,
  userRemoveFavoritedBook: userActions.userRemoveFavoritedBook
};

export default connect(mapStateToProps, actionCreators)(FavoritesPage);
