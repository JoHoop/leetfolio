import React from 'react';
import { Box, ButtonGroup, Button } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { authProviders } from '../data/authProviders';
import { signInWithAuthProvider, anonSignIn } from '../services/Auth.js';

export const AuthProvidersList = ({ mobile }) => {
  return (
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
              onClick={() => signInWithAuthProvider(authProvider, mobile)}
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
  );
};
