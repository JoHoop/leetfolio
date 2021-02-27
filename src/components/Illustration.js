import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  illustration: {
    width: '100%',
  },
}));

export const Illustration = ({ illustration }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <img
        src={illustration}
        className={classes.illustration}
        alt='LeetFolio Logo'
      />
    </React.Fragment>
  );
};
