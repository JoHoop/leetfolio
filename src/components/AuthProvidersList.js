import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Box, Button } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { authProviders } from '../data/authProviders';
import { signInWithAuthProvider, anonSignIn } from '../services/Auth.js';
import { Loading } from '../components/Loading';
import { Notification } from '../components/Notification';

export const AuthProvidersList = ({ mobile }) => {
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

  const handleSignIn = async (authProvider) => {
    setLoading(true);
    try {
      await signInWithAuthProvider(authProvider, mobile);
      return <Redirect to='/account' />;
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return (
    <React.Fragment>
      <Box mb={3}>
        <React.Fragment>
          {authProviders.map((authProvider) => {
            return (
              <Button
                key={authProvider.id}
                startIcon={authProvider.icon}
                style={{ color: authProvider.color }}
                disabled={authProvider.id === 'apple.com'} // to remove
                variant='outlined'
                fullWidth
                onClick={() => handleSignIn(authProvider)}
              >
                {authProvider.name}
              </Button>
            );
          })}
          <Button
            key={'anonym'}
            startIcon={<PermIdentityIcon />}
            variant='outlined'
            fullWidth
            onClick={() => anonSignIn()}
          >
            Anonym
          </Button>
        </React.Fragment>
      </Box>
      <Notification notify={notify} setNotify={setNotify} />
      {loading && <Loading />}
    </React.Fragment>
  );
};
