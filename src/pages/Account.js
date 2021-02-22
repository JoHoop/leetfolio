import React from 'react';
import { Typography } from '@material-ui/core';

export const Account = () => {
  return (
    <React.Fragment>
      <Typography component='h1' variant='h2' color='textPrimary' gutterBottom>
        Account
      </Typography>
      <Typography variant='h5' color='textSecondary' paragraph>
        Account
      </Typography>
    </React.Fragment>
  );
};
