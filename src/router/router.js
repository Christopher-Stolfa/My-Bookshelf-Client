import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { routes } from "../config";
import { connect } from "react-redux";
import { userActions } from "../actions/userActions";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import ElevateAppBar from "../components/ElevateAppBar/ElevateAppBar";
import HomePage from "../pages/HomePage/HomePage";
import Error404Page from "../pages/Error404Page/Error404Page";
import SearchResultsPage from "../pages/SearchResultsPage/SearchResultsPage";

const RouterComponent = ({ getUserSession }) => {
  useEffect(() => {
    // This is a temporary fix, but this checks if there is an active session.
    getUserSession();
    return () => {};
  }, [getUserSession]);
  return (
    <Router>
      <ElevateAppBar>
        <Routes>
          <Route exact path={"/"} element={<Navigate to={routes.home} />} />
          <Route path={routes.home} element={<HomePage />} />
          <Route path={routes.signIn} element={<SignInPage />} />
          <Route path={routes.signUp} element={<SignUpPage />} />
          <Route path={routes.searchResults} element={<SearchResultsPage />} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </ElevateAppBar>
    </Router>
  );
};

RouterComponent.propTypes = {
  getUserSession: PropTypes.func.isRequired
};

const actionCreators = {
  getUserSession: userActions.getUserSession
};

export default connect(null, actionCreators)(RouterComponent);
