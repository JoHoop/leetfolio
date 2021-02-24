import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    borderLeft: '1px solid #ebebeb',
    paddingLeft: '2em',
  },
}));

export const Line = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};
