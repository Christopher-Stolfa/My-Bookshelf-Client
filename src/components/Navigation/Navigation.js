import React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getUserSelector } from "../../selectors/userSelectors";
import { userActions } from "../../actions/userActions";
import NavigationSearch from "./NavigationSearch";

const Navigation = (props) => {
  const navigate = useNavigate();
  const handleOnClick = (e) => {
    navigate(e.target.name);
  };
  const handleSignout = (e) => {
    props.signOut();
  };

  return (
    <AppBar>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          My Bookshelf
        </Typography>
        <NavigationSearch />
        <Button onClick={handleOnClick} name="home" color="inherit">
          Home
        </Button>
        {props.user.loggedIn ? (
          <Button onClick={handleSignout} name="sign-out" color="inherit">
            Sign Out
          </Button>
        ) : (
          <>
            <Button onClick={handleOnClick} name="sign-in" color="inherit">
              Sign In
            </Button>
            <Button onClick={handleOnClick} name="sign-up" color="inherit">
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
