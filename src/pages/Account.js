import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import Firebase from '../services/Firebase';
import {
  signOut,
  changeUsername,
  changeEmail,
  changePassword,
  changePhoto,
  deleteUser,
  resetPassword,
  verifyEmail,
} from '../services/Auth.js';

import { UserContext } from '../services/UserProvider.js';
import { Button, Typography } from '@material-ui/core';

export const Account = () => {
  const { currentUser } = useContext(UserContext);

  const handleSignOut = async () => {
    signOut();
    return <Redirect to='/signin' />;
  };

  return (
    <React.Fragment>
      <Typography component='h1' variant='h2' color='textPrimary' gutterBottom>
        Account
      </Typography>
      <Typography variant='h5' color='textSecondary' paragraph>
        Hey, {currentUser.email}
      </Typography>
      <Button color='default' onClick={handleSignOut}>
        Sign out
      </Button>
    </React.Fragment>
  );
};
