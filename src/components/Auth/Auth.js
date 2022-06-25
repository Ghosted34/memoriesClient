import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Input from "./Input";
import Icon from "./Icon";
import useStyles from "./styles";
import { LockOutlined } from "@mui/icons-material";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, signin } from "../../actions/auth";
// import { GoogleLogin } from "@react-oauth/google";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPasswd, setShowPasswd] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_LOGIN_ID,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

  const handleShowPass = () => {
    setShowPasswd((prevShowPasswd) => !prevShowPasswd);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    if (isSignUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSwitch = () => {
    setIsSignUp(!isSignUp);
    setShowPasswd(false);
  };

  const googleSuccess = async (res) => {
    console.log(res);
    const result = res?.profileObj;

    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const googleFailure = (error) => {
    console.error(error);
    console.log("google sign in was unsucessful");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar} color="secondary !important">
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  halve
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  halve
                />
              </>
            )}

            <Input
              name="email"
              label="Email Address"
              type="email"
              handleChange={handleChange}
              autoFocus={!isSignUp}
            />
            <Input
              name="password"
              label="Password"
              type={showPasswd ? "text" : "password"}
              handleChange={handleChange}
              handleShowPass={handleShowPass}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                type={showPasswd ? "text" : "password"}
                handleChange={handleChange}
                handleShowPass={handleShowPass}
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>

          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_LOGIN_ID}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Sign In with Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={handleSwitch}>
                {isSignUp
                  ? "Already have an account? Sign in."
                  : "Don't have a account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
