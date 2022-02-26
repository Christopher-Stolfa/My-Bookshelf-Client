import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { routes } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import { checkIfLoading } from "../../selectors/uiSelectors";
import getUserSelector from "../../selectors/userSelectors";
import { Visibility, VisibilityOff, AccountCircle } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  CssBaseline,
  TextField,
  Avatar,
  Button,
  Typography,
  Container,
  Box,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import {
  validatePassword,
  validatePasswordText,
} from "../../helpers/validaters";
import { userActions } from "../../actions/userActions";
import { userTypes } from "../../types/userTypes";

const AccountPage = ({ updatePassword, isLoading, user: { loggedIn } }) => {
  const navigate = useNavigate();
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
  });
  const [notValid, setNotValid] = useState(false);

  useEffect(() => {
    if (!loggedIn) navigate(routes.home);
    return () => {};
  }, [loggedIn]);

  useEffect(() => {
    password.newPassword === "" || validatePassword(password.newPassword)
      ? setNotValid(false)
      : setNotValid(true);
  }, [password.newPassword]);

  const handlePassword = ({ target: { value } }) =>
    setPassword((prevState) => ({ ...prevState, currentPassword: value }));

  const handleNewPassword = ({ target: { value } }) =>
    setPassword((prevState) => ({ ...prevState, newPassword: value }));

  const handleShowCurrentPassword = () =>
    setShowPassword((prevState) => ({
      ...prevState,
      currentPassword: !prevState.currentPassword,
    }));

  const handleShowNewPassword = () =>
    setShowPassword((prevState) => ({
      ...prevState,
      newPassword: !prevState.newPassword,
    }));

  const handlePasswordToggle = () =>
    setPasswordToggle((prevState) => !prevState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputData = {
      data: JSON.stringify({
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
      }),
    };
    updatePassword(inputData);
    setPassword({ currentPassword: "", newPassword: "" });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5">
          Account Page
        </Typography>
        <Box
          id="edit-account-form"
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Typography variant="body1">Update password</Typography>
          <TextField
            required
            fullWidth
            margin="normal"
            name="current-password"
            label="Current password"
            id="current-password"
            value={password.currentPassword}
            autoComplete="current-password"
            type={showPassword.currentPassword ? "text" : "password"}
            onChange={handlePassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowCurrentPassword}
                  >
                    {showPassword.currentPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button onClick={handlePasswordToggle}>
            {passwordToggle
              ? "Close update password field"
              : "Open update password field"}
          </Button>
          {passwordToggle && (
            <>
              <Typography variant="body1">
                To update your password, enter your current password in the
                above textfield. Enter your new password below and then press
                submit.
              </Typography>
              <TextField
                required
                fullWidth
                margin="normal"
                name="new-password"
                label="New password"
                type={showPassword.newPassword ? "text" : "password"}
                id="new-password"
                value={password.newPassword}
                autoComplete="new-password"
                helperText={notValid && validatePasswordText}
                onChange={handleNewPassword}
                error={notValid}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowNewPassword}
                      >
                        {showPassword.newPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

AccountPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  updatePassword: PropTypes.func.isRequired,
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
    userData: PropTypes.shape({
      displayName: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserSelector(state),
  isLoading: checkIfLoading(state, userTypes.UPDATE_PASSWORD_FETCH),
});

const actionCreators = {
  updatePassword: userActions.updatePassword,
};

export default connect(mapStateToProps, actionCreators)(AccountPage);
