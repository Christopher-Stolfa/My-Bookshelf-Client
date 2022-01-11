import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getUserSelector } from "../../selectors/userSelectors";
import { getErrorsSelector } from "../../selectors/errorSelectors";
import { userActions } from "../../actions/userActions";
import { connect } from "react-redux";

const theme = createTheme();

const Copyright = props => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {"Copyright © "}
    <Link color="inherit" to="/home">
      Ebay Item Tracker
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);

const SignupPage = props => {
  Axios.defaults.withCredentials = true;
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();
    setMessage("");
    setErrors([]);
    const data = new FormData(event.currentTarget);
    props.signUp(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="displayName"
                  label="Display Name"
                  name="displayName"
                  autoComplete="display-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack spacing={2}>
                  {message.length > 0 && (
                    <Alert key={"success-msg"} severity="success">
                      {message}
                    </Alert>
                  )}
                  {errors.length > 0 &&
                    errors.map((error, i) => (
                      <Alert key={"error-msg-" + i} severity="error">
                        {error}
                      </Alert>
                    ))}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
const mapStateToProps = state => ({
  user: getUserSelector(state),
  errors: getErrorsSelector(state)
});

const actionCreators = {
  signUp: userActions.signUp
};

export default connect(mapStateToProps, actionCreators)(SignupPage);
