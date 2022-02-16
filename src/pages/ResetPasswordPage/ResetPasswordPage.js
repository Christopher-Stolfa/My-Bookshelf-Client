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
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { userTypes } from "../../types/userTypes";
import { checkIfLoading } from "../../selectors/uiSelectors";

const validate = (pass) =>
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/.test(pass);

const helperText =
  "Please enter a password between 8 and 16 characters with at least one uppercase character, number and special character.";

const ResetPasswordPage = ({
  user: { loggedIn },
  isLoading,
  checkResetToken,
  updatePasswordWithToken,
}) => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [notValid, setNotValid] = useState(false);
  const [notValid2, setNotValid2] = useState(false);

  useEffect(() => {
    loggedIn && navigate(routes.home, { replace: true });
    const checkTokenGetEmail = async () => {
      const inputData = {
        params: {
          resetPasswordToken: token,
        },
      };
      const data = await checkResetToken(inputData);
      if (data) {
        setEmail(data.email);
      } else {
        navigate(routes.home, { replace: true });
      }
    };
    checkTokenGetEmail();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setNotValid(true);
      setNotValid2(true);
    } else {
      const inputData = {
        data: JSON.stringify({
          token,
          email,
          password,
        }),
      };
      await updatePasswordWithToken(inputData);
      setPassword("");
      setPassword2("");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
          <TextField
            required
            fullWidth
            margin="normal"
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            helperText={notValid && helperText}
            onChange={handlePassword}
            error={notValid}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            name="password2"
            label="Confirm Password"
            type="password"
            id="password2"
            autoComplete="new-password"
            helperText={notValid && helperText}
            onChange={handlePassword2}
            error={notValid2}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
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

ResetPasswordPage.propTypes = {
  checkResetToken: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  updatePasswordWithToken: PropTypes.func.isRequired,
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserSelector(state),
  isLoading:
    checkIfLoading(state, userTypes.GET_CHECK_RESET_TOKEN_FETCH) ||
    checkIfLoading(state, userTypes.GET_UPDATE_PASSWORD_WITH_TOKEN_FETCH),
});

const actionCreators = {
  checkResetToken: userActions.checkResetToken,
  updatePasswordWithToken: userActions.updatePasswordWithToken,
};

export default connect(mapStateToProps, actionCreators)(ResetPasswordPage);
