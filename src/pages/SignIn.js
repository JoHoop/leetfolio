import React, { useState, useCallback, useContext } from 'react';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { signIn } from '../services/Auth.js';
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
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

export const SignIn = () => {
  const classes = useStyles();
  const [values, handleChange] = UseForm({
    email: '',
    password: '',
  });

  const { email, password } = values;
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const showError = (error) => {
    setErrorMessage(`${error.message} (Code: ${error.code})`);
  };

  const resetError = () => {
    setErrorMessage('');
  };

  const handleSignIn = useCallback(async () => {
    setIsLoading(true);
    try {
      await signIn(email, password);
      console.log('success');
      return <Redirect to='/account' />;
    } catch (error) {
      console.log(error);
      showError(error);
    }
    setIsLoading(false);
  }, [email, password]);

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
        <form className={classes.form} noValidate>
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
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={!emailInputValid}
            onClick={() => handleSignIn()}
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
        </form>
      </Box>
      {isLoading && <Loading />}
      <Snackbar
        open={errorMessage !== ''}
        autoHideDuration={6000}
        onClose={resetError}
      >
        <Alert onClose={resetError} severity='success'>
          This is a success message!
        </Alert>
      </Snackbar>
    </Container>
  );
};
