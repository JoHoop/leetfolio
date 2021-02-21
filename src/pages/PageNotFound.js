import React from 'react';
import { Typography } from '@material-ui/core';

export const PageNotFound = () => {
  return (
    <React.Fragment>
      <Typography component='h1' variant='h2' color='textPrimary' gutterBottom>
        PageNotFound
      </Typography>
      <Typography variant='h5' color='textSecondary' paragraph>
        PageNotFound
      </Typography>
    </React.Fragment>
  );
};
