import React from 'react';
import { Typography } from '@material-ui/core';
import { Illustration } from '../components/Illustration';
import Taken from '../illustrations/taken.svg';

export const PageNotFound = () => {
  return (
    <React.Fragment>
      <Typography component='h1' variant='h2' color='textPrimary' gutterBottom>
        Page not found
      </Typography>
      <Illustration illustration={Taken} />
    </React.Fragment>
  );
};
