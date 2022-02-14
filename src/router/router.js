import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { routes, routeIds } from "../config";
import { connect } from "react-redux";
import { userActions } from "../actions/userActions";
import { checkIfLoading } from "../selectors/uiSelectors";
import { getUserSelector } from "../selectors/userSelectors";
import { getFavoritedBooks, bookActions } from "../actions/bookActions";
import { userTypes } from "../types/userTypes";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import ElevateAppBar from "../components/ElevateAppBar/ElevateAppBar";
import HomePage from "../pages/HomePage/HomePage";
import Error404Page from "../pages/Error404Page/Error404Page";
import SearchResultsPage from "../pages/SearchResultsPage/SearchResultsPage";
import BookResultPage from "../pages/SearchResultsPage/BookResultPage";
import SearchResults from "../pages/SearchResultsPage/SearchResults";
import Results from "../pages/SearchResultsPage/Results";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
import FavoriteBooks from "../pages/FavoritesPage/FavoriteBooks";
import FavoriteBookPage from "../pages/FavoritesPage/FavoriteBookPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";

const RouterComponent = ({ getUserSession, getFavorites, isLoading, user }) => {
  const [firstRender, setFirstRender] = useState(true);

  useEffect(async () => {
    // This is a temporary fix, but this checks if there is an active session.
    await getUserSession();
    setFirstRender(false);
  }, [getUserSession]);

  useEffect(() => {
    user.loggedIn && getFavorites();
  }, [user]);

  return (
    <Router>
      {!firstRender && (
        <ElevateAppBar>
          <Routes>
            <Route exact path={"/"} element={<Navigate to={routes.home} />} />
            <Route path={routes.home} element={<HomePage />} />
            <Route path={routes.signIn} element={<SignInPage />} />
            <Route path={routes.signUp} element={<SignUpPage />} />
            <Route
              path={routes.forgotPassword}
              element={<ForgotPasswordPage />}
            />
            <Route path={routes.favorites} element={<FavoritesPage />}>
              <Route path={routeIds.pageNum} element={<FavoriteBooks />}>
                <Route path={routeIds.bookId} element={<FavoriteBookPage />} />
              </Route>
            </Route>
            <Route path={routes.searchResults} element={<SearchResultsPage />}>
              <Route path={routeIds.searchQuery} element={<SearchResults />}>
                <Route path={routeIds.pageNum} element={<Results />}>
                  <Route path={routeIds.bookId} element={<BookResultPage />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<Error404Page />} />
          </Routes>
        </ElevateAppBar>
      )}
    </Router>
  );
};

RouterComponent.propTypes = {
  getUserSession: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    loggedIn: PropTypes.bool,
  }),
};

const mapStateToProps = (state) => ({
  isLoading: checkIfLoading(state, userTypes.GET_SESSION_FETCH),
  user: getUserSelector(state),
});

const actionCreators = {
  getUserSession: userActions.getUserSession,
  getFavorites: bookActions.getFavoritedBooks,
};

export default connect(mapStateToProps, actionCreators)(RouterComponent);
