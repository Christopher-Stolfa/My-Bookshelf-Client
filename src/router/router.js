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
import ElevateAppBar from "../components/ElevateAppBar/ElevateAppBar";
import HomePage from "../pages/HomePage/HomePage";
import { routes } from "../config";
import { connect } from "react-redux";
import { userActions } from "../actions/userActions";

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
          <Route path={routes.signIn} element={<SigninPage />} />
          <Route path={routes.signUp} element={<SignupPage />} />
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
