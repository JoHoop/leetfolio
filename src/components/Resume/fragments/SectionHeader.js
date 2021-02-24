import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  sectionHeader: {
    color: '#329cb9',
    fontSize: '1.3em',
    margin: '0 0 1em',
  },
}));

export const SectionHeader = ({ children }) => {
  const classes = useStyles();

  return <h2 className={classes.sectionHeader}>{children}</h2>;
};
