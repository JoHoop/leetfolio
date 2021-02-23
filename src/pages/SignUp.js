import React, { useState, useCallback, useContext } from 'react';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { signUp, changeUsername } from '../services/Auth.js';
import { UserContext } from '../services/UserProvider.js';
import { UseForm } from '../components/UseForm';
import { isEmailValid } from '../services/Validators';
import { Loading } from '../components/Loading';
import {
  Avatar,
  Snackbar,
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
import MuiAlert from '@material-ui/lab/Alert';
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

export const SignUp = () => {
  const classes = useStyles();
  const [values, handleChange] = UseForm({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = values;
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetError = () => {
    setErrorMessage('');
  };

  const handleSignUp = useCallback(async () => {
    setIsLoading(true);
    try {
      await signUp(email, password);
      await changeUsername(username);
      return <Redirect to='/account' />;
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  }, [email, password, username]);

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
          Sign up
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete='username'
              name='username'
              variant='outlined'
              required
              fullWidth
              id='username'
              label='Username'
              value={username}
              onChange={handleChange}
              autoFocus
            />
          </Grid>
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
          variant='contained'
          color='primary'
          className={classes.submit}
          disabled={!emailInputValid}
          onClick={handleSignUp}
        >
          Sign up
        </Button>
        <Grid container>
          <Grid item xs>
            <Link component={NavLink} to={'/reset'} variant='body2'>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link component={NavLink} to={'/signin'} variant='body2'>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
      {isLoading && <Loading />}
      <Snackbar
        open={errorMessage !== ''}
        autoHideDuration={6000}
        onClose={resetError}
      >
        <Alert onClose={resetError} severity='error'>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};
