import React, { useState, useCallback, useContext } from 'react';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { resetPassword } from '../services/Auth.js';
import { UserContext } from '../services/UserProvider.js';
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
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = useCallback(async () => {
    setIsLoading(true);
    try {
      await resetPassword(emailInput);
    } catch (error) {
      setNotify({
        isOpen: true,
        message: error.message,
        type: 'error',
      });
    }
    setIsLoading(false);
  }, [emailInput]);

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
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
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
      {isLoading && <Loading />}
      <Notification notify={notify} setNotify={setNotify} />
    </Container>
  );
};
