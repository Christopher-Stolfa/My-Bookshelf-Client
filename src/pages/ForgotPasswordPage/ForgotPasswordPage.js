/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { getUserSelector } from "../../selectors/userSelectors";
import { userActions } from "../../actions/userActions";
import { routes } from "../../config";
import { checkIfLoading } from "../../selectors/uiSelectors";
import { userTypes } from "../../types/userTypes";

const ForgotPasswordPage = ({
  isLoading,
  forgotPassword,
  user: { loggedIn }
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (loggedIn) navigate(routes.home, { replace: true });
    return () => {};
  }, [loggedIn]);

  const handleChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const inputData = {
      data: JSON.stringify({
        email
      })
    };
    forgotPassword(inputData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Backdrop
        sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot your password?
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          If you wish to reset your password, enter the email associated with
          your profile and we will send you a password reset link that expires
          in 10 minutes. NOTE: The email may be sent to your spam folder.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Button
            color="primary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send password recovery email
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

ForgotPasswordPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  user: getUserSelector(state),
  isLoading: checkIfLoading(state, userTypes.GET_FORGOT_PASSWORD_FETCH)
});

const actionCreators = {
  forgotPassword: userActions.forgotPassword
};

export default connect(mapStateToProps, actionCreators)(ForgotPasswordPage);
