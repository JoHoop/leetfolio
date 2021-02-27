import React from 'react';
import { Typography } from '@material-ui/core';
import { Illustration } from '../components/Illustration';
import OnlineResume from '../illustrations/onlineResume.svg';

export const Home = () => {
  return (
    <React.Fragment>
      <Typography component='h1' variant='h2' color='textPrimary' gutterBottom>
        LeetFolio
      </Typography>
      <Typography variant='h5' color='textSecondary' paragraph>
        LeetFolio
      </Typography>
      <Illustration illustration={OnlineResume} />
    </React.Fragment>
  );
};
