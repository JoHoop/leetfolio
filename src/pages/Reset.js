import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { resetPassword } from '../services/Auth.js';
import { UserContext } from '../services/UserProvider.js';
import { isEmailValid } from '../services/Validators';
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

export const Reset = () => {
  const classes = useStyles();
  const [emailInput, setEmailInput] = useState('');
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      await resetPassword(emailInput);
      setNotify({
        isOpen: true,
        message:
          'A password reset email was sent to help you set up a new one.',
        type: 'success',
      });
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

  const emailInputValid = () => {
    return emailInput === '' || isEmailValid(emailInput);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box className={classes.paper}>
        <Logo className={classes.logo} />
        <Typography component='h1' variant='h5'>
          Reset password
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
              value={emailInput}
              onChange={(event) => setEmailInput(event.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant='outlined'
          color='primary'
          className={classes.submit}
          disabled={!emailInputValid}
          onClick={handleResetPassword}
        >
          Sign in
        </Button>
        <Grid container>
          <Grid item xs>
            <Link component={NavLink} to={'/signin'} variant='body2'>
              Sign in
            </Link>
          </Grid>
          <Grid item>
            <Link component={NavLink} to={'/signup'} variant='body2'>
              Don't have an account? Sign up
            </Link>
          </Grid>
        </Grid>
      </Box>
      {loading && <Loading />}
      <Notification notify={notify} setNotify={setNotify} />
    </Container>
  );
};
