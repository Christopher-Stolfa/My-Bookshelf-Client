import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserSelector } from "../../selectors/userSelectors";
import { userActions } from "../../actions/userActions";
import { routes } from "../../config";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  IconButton,
  InputAdornment,
  Container,
  Typography,
  Box,
  CircularProgress,
  Backdrop,
  Grid,
  TextField,
  CssBaseline,
  Button,
  Avatar,
} from "@mui/material";
import { userTypes } from "../../types/userTypes";
import { checkIfLoading } from "../../selectors/uiSelectors";
import {
  Visibility,
  VisibilityOff,
  AccountCircle,
  LockOutlined,
} from "@mui/icons-material";
import {
  validatePassword,
  validatePasswordText,
} from "../../helpers/validaters";

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
  const [notValid, setNotValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  useEffect(() => {
    validatePassword(password) || password === ""
      ? setNotValid(false)
      : setNotValid(true);
  }, [password]);

  const handleShowPassword = () => setShowPassword((prevState) => !prevState);

  const handlePassword = ({ target: { value } }) => setPassword(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputData = {
      data: JSON.stringify({
        token,
        email,
        password,
      }),
    };
    await updatePasswordWithToken(inputData);
    setPassword("");
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
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            margin="normal"
            name="new-password"
            label="New Password"
            type={showPassword ? "text" : "password"}
            id="new-password"
            value={password}
            autoComplete="new-password"
            helperText={notValid && validatePasswordText}
            onChange={handlePassword}
            error={notValid}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
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
