import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { signUp, changeUsername } from '../services/Auth.js';
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignUp = () => {
  const classes = useStyles();
  const [values, handleChange] = UseForm({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = values;
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await signUp(email, password);
      await changeUsername(username);
      return <Redirect to='/account' />;
    } catch (error) {
      setNotify({
        isOpen: true,
        message: error.message,
        type: 'error',
      });
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
          variant='outlined'
          color='primary'
          className={classes.submit}
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
      {loading && <Loading />}
      <Notification notify={notify} setNotify={setNotify} />
    </Container>
  );
};
