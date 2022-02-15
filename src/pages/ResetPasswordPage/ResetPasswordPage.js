import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserSelector } from "../../selectors/userSelectors";
import { userActions } from "../../actions/userActions";
import { routes } from "../../config";
import { Link, useNavigate, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const validate = (pass) =>
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/.test(pass);

const ResetPasswordPage = (props) => {
  const params = useParams();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [notValid, setNotValid] = useState(false);
  const [notValid2, setNotValid2] = useState(false);

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
    validate(value) || value === "" ? setNotValid(false) : setNotValid(true);
  };

  const handlePassword2 = ({ target: { value } }) => {
    setPassword2(value);

    validate(value) || (value === "" && value !== password)
      ? setNotValid2(false)
      : setNotValid2(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          Reset Password
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                helperText={notValid && "Please enter a valid password"}
                onChange={handlePassword}
                error={notValid}
              />
              <TextField
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="new-password"
                helperText={notValid && "Please enter a valid password"}
                onChange={handlePassword2}
                error={notValid2}
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
              <Link to={routes.signIn} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

ResetPasswordPage.propTypes = {};

const mapStateToProps = (state) => ({
  user: getUserSelector(state),
});

const actionCreators = {
  forgotPassword: userActions.forgotPassword,
};

export default connect(mapStateToProps, actionCreators)(ResetPasswordPage);
