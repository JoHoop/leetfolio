import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export const Notification = ({ notify, setNotify }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      open={notify.isOpen}
      onClose={handleClose}
      autoHideDuration={8000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        elevation={6}
        variant='outlined'
        severity={notify.type}
        onClose={handleClose}
      >
        {notify.message}
      </Alert>
    </Snackbar>
  );
};
