import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Toolbar,
  Button,
  Typography,
  AppBar,
  Stack,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getUserSelector } from "../../selectors/userSelectors";
import { userActions } from "../../actions/userActions";
import { routes } from "../../config";

const Navigation = ({ user: { loggedIn }, signOut }) => {
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const handleOnClick = ({ target: { name } }) => {
    const path = name === routes.favorites ? `${name}/1` : name;
    navigate(path);
  };

  const handleOnMenuClick = (e, route) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    const path = route === routes.favorites ? `${route}/1` : route;
    setOpen(false);
    navigate(path);
  };
  const handleSignout = () => signOut();

  return (
    <AppBar>
      <Toolbar sx={{ display: "flex" }}>
        {isMobile ? (
          <Stack direction="row" spacing={2}>
            <Button
              color="inherit"
              sx={{ fontSize: "1rem" }}
              variant="text"
              startIcon={<MenuIcon />}
              ref={anchorRef}
              id="menu-button"
              aria-controls={open ? "route-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              MENU
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
              style={{ zIndex: 1 }}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="route-menu"
                        aria-labelledby="route-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem
                          onClick={(e) => handleOnMenuClick(e, routes.home)}
                          key={routes.home}
                          color="inherit"
                        >
                          Home
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => handleOnMenuClick(e, routes.about)}
                          key={routes.about}
                          color="inherit"
                        >
                          About
                        </MenuItem>
                        {loggedIn
                          ? [
                              <MenuItem
                                onClick={(e) =>
                                  handleOnMenuClick(e, routes.favorites)
                                }
                                key={routes.favorites}
                                color="inherit"
                              >
                                Favorites
                              </MenuItem>,
                              <MenuItem
                                onClick={(e) =>
                                  handleOnMenuClick(e, routes.account)
                                }
                                key={routes.account}
                                color="inherit"
                              >
                                Account
                              </MenuItem>,
                              <MenuItem
                                onClick={handleSignout}
                                key={routes.signOut}
                                color="inherit"
                              >
                                Sign Out
                              </MenuItem>,
                            ]
                          : [
                              <MenuItem
                                onClick={(e) =>
                                  handleOnMenuClick(e, routes.signIn)
                                }
                                key={routes.signIn}
                                color="inherit"
                              >
                                Sign In
                              </MenuItem>,
                              <MenuItem
                                onClick={(e) =>
                                  handleOnMenuClick(e, routes.signUp)
                                }
                                key={routes.signUp}
                                color="inherit"
                              >
                                Sign Up
                              </MenuItem>,
                            ]}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Stack>
        ) : (
          <>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: "block",
              }}
            >
              My Bookshelf
            </Typography>
            <Button onClick={handleOnClick} name={routes.home} color="inherit">
              Home
            </Button>
            <Button onClick={handleOnClick} name={routes.about} color="inherit">
              About
            </Button>
            {loggedIn ? (
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
