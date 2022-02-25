import React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getUserSelector } from "../../selectors/userSelectors";
import { userActions } from "../../actions/userActions";
import { routes } from "../../config";

const Navigation = (props) => {
  const navigate = useNavigate();
  const handleOnClick = ({ target: { name } }) => {
    const path = name === routes.favorites ? `${name}/1` : name;
    navigate(path);
  };
  const handleSignout = (e) => {
    props.signOut();
  };

  return (
    <AppBar>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          My Bookshelf
        </Typography>
        <Button onClick={handleOnClick} name={routes.home} color="inherit">
          Home
        </Button>
        {props.user.loggedIn ? (
          <>
            <Button
              onClick={handleOnClick}
              name={routes.favorites}
              color="inherit"
            >
              Favorites
            </Button>
            <Button
              onClick={handleOnClick}
              name={routes.account}
              color="inherit"
            >
              Account
            </Button>
            <Button
              onClick={handleSignout}
              name={routes.signOut}
              color="inherit"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={handleOnClick}
              name={routes.signIn}
              color="inherit"
            >
              Sign In
            </Button>
            <Button
              onClick={handleOnClick}
              name={routes.signUp}
              color="inherit"
            >
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

Navigation.propTypes = {
  signOut: PropTypes.func.isRequired,
  user: PropTypes.shape({
    message: PropTypes.string,
    loggedIn: PropTypes.bool,
    userData: PropTypes.object,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserSelector(state),
});

const actionCreators = {
  signOut: userActions.signOut,
};

export default connect(mapStateToProps, actionCreators)(Navigation);
