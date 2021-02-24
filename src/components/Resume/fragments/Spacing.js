import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spacing: {
    marginBottom: '4em',
  },
  spacingSmall: {
    marginBottom: '1em',
  },
}));

export const Spacing = (props) => {
  const classes = useStyles();

  return props.small ? (
    <div className={classes.spacingSmall}>{props.children}</div>
  ) : (
    <div className={classes.spacing}>{props.children}</div>
  );
};
