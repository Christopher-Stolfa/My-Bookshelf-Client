import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import SignupPage from "../pages/SignupPage/SignupPage";
import SigninPage from "../pages/SigninPage/SigninPage";
import Navigation from "../components/Navigation/Navigation";
import HomePage from "../pages/HomePage/HomePage";
import { routes } from "../config";
import { connect } from "react-redux";
import { getUserSelector } from "../selectors/userSelectors";
import { getErrorsSelector } from "../selectors/errorSelectors";
import { userActions } from "../actions/userActions";

const RouterComponent = props => {
  useEffect(() => {
    // This is a temporary fix, but this checks if there is an active session.
    props.getUserSession();
  }, []);
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route exact path={"/"} element={<Navigate to={routes.home} />} />
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.signIn} element={<SigninPage />} />
        <Route path={routes.signUp} element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

const mapStateToProps = state => ({
  user: getUserSelector(state),
  errors: getErrorsSelector(state)
});

const actionCreators = {
  getUserSession: userActions.getUserSession
};

export default connect(mapStateToProps, actionCreators)(RouterComponent);
