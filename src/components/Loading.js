import React, { useState } from 'react';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const Loading = () => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};

export const LoadingError = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};
