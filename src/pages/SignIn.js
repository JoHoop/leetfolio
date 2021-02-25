import React, { useState, useCallback, useContext } from 'react';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { signIn, signInWithGoogle } from '../services/Auth.js';
import { UserContext } from '../services/UserProvider.js';
import { UseForm } from '../services/UseForm';
import { isEmailValid } from '../services/Validators';
import { Loading } from '../components/Loading';
import { Notification } from '../components/Notification';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  makeStyles,
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  signInButton: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignIn = () => {
  const classes = useStyles();
  const [values, handleChange] = UseForm({
    email: '',
    password: '',
  });

  const { email, password } = values;
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const setError = (error) => {
    setNotify({
      isOpen: true,
      message: error.message,
      type: 'error',
    });
  };

  const handleSignIn = useCallback(async () => {
    setIsLoading(true);
    try {
      await signIn(email, password);

      return <Redirect to='/account' />;
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }, [email, password]);

  const handleSignInWithGoogle = useCallback(async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle;
      return <Redirect to='/account' />;
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }, []);

  const { currentUser } = useContext(UserContext);

  if (currentUser) {
    return <Redirect to='/account' />;
  }

  const emailInputValid = () => {
    return email === '' || isEmailValid(email);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              autoComplete='email'
              value={email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant='outlined'
          color='primary'
          className={classes.signInButton}
          disabled={!emailInputValid}
          onClick={handleSignIn}
        >
          Sign in
        </Button>
        <Grid container>
          <Grid item xs>
            <Link component={NavLink} to={'/reset'} variant='body2'>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link component={NavLink} to={'/signup'} variant='body2'>
              Don't have an account? Sign up
            </Link>
          </Grid>
        </Grid>
        <Button
          variant='outlined'
          color='secondary'
          disabled
          className={classes.googleButton}
          onClick={handleSignInWithGoogle}
        >
          Sign in with Google
        </Button>
      </Box>
      <Notification notify={notify} setNotify={setNotify} />
      {isLoading && <Loading />}
    </Container>
  );
};
