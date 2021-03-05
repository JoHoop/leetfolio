import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { signIn } from '../services/Auth.js';
import { AuthProvidersList } from '../components/AuthProvidersList';
import { UserContext } from '../services/UserProvider.js';
import { UseForm } from '../services/UseForm';
import { Loading } from '../components/Loading';
import { Notification } from '../components/Notification';
import { Logo } from '../components/Logo';
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  makeStyles,
  useMediaQuery,
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    margin: theme.spacing(1),
  },
  signInButton: {
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
  const [loading, setLoading] = useState(false);
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

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'), {
    defaultMatches: true,
    noSsr: true,
  });

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn(email, password);
      return <Redirect to='/account' />;
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const { currentUser } = useContext(UserContext);

  if (currentUser) {
    return <Redirect to='/account' />;
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box className={classes.paper}>
        <Logo className={classes.logo} />
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
        <br />
        <Divider />
        <br />
        <AuthProvidersList mobile={isMobile} />
      </Box>
      <Notification notify={notify} setNotify={setNotify} />
      {loading && <Loading />}
    </Container>
  );
};
