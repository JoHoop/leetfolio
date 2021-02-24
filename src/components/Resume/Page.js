import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  page: {
    margin: '0 auto',
    maxWidth: '1250px',
    boxShadow: '-25px 25px 25px 0 rgba(0, 0, 0, 0.15)',
    backgroundColor: '#fefefe',
    border: '#ffffff',
  },
}));

export const Page = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.page}>{children}</div>;
};
