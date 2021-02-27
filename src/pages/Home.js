import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import OnlineResumeIllustration from '../data/onlineResume.svg';

const useStyles = makeStyles((theme) => ({
  illustration: {
    width: '100%',
  },
}));

export const Home = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography component='h1' variant='h2' color='textPrimary' gutterBottom>
        LeetFolio
      </Typography>
      <Typography variant='h5' color='textSecondary' paragraph>
        LeetFolio
      </Typography>
      <img
        src={OnlineResumeIllustration}
        className={classes.illustration}
        alt='LeetFolio Logo'
      />
    </React.Fragment>
  );
};
