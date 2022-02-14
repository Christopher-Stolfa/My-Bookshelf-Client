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
import { getUserSelector } from "../../selectors/userSelectors";
import { userActions } from "../../actions/userActions";
import { routes } from "../../config";

const ForgotPasswordPage = ({ passwordReset, user: { loggedIn } }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (loggedIn) navigate(routes.home);
    return () => {};
  }, [loggedIn]);

  const handleChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputData = {
      data: JSON.stringify({
        email,
      }),
    };
    passwordReset(inputData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
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
  passwordReset: PropTypes.func.isRequired,
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserSelector(state),
});

const actionCreators = {
  passwordReset: userActions.passwordReset,
};

export default connect(mapStateToProps, actionCreators)(ForgotPasswordPage);
