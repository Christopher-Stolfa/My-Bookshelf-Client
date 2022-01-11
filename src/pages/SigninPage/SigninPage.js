import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
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
import { endPoints, controllers, routes } from "../../config";

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

const SigninPage = props => {
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    props.signIn(data);
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/sign-up" variant="body2">
                  "Don't have an account? Sign Up"
                </Link>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Stack spacing={2}>
                    {message.length > 0 && (
                      <Alert key={"success-msg"} severity="success">
                        {message}
                      </Alert>
                    )}
                    {error.length > 0 && (
                      <Alert key={"Error-msg"} severity="error">
                        {error}
                      </Alert>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

SigninPage.propTypes = {
  signIn: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    message: PropTypes.string
  }),
  user: PropTypes.shape({
    message: PropTypes.string,
    loggedIn: PropTypes.bool,
    userData: PropTypes.object
  })
};

const mapStateToProps = state => ({
  user: getUserSelector(state),
  errors: getErrorsSelector(state)
});

const actionCreators = {
  signIn: userActions.signIn
};

export default connect(mapStateToProps, actionCreators)(SigninPage);
