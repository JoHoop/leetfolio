import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import {
  Avatar,
  Badge,
  Snackbar,
  Button,
  Typography,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Checkbox,
  TextField,
  FormControlLabel,
  withStyles,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Firebase from '../services/Firebase';
import { UserContext } from '../services/UserProvider.js';
import {
  signOut,
  changeUsername,
  changeEmail,
  changePassword,
  changePhoto,
  deleteUser,
  resetPassword,
  verifyEmail,
} from '../services/Auth.js';
import { UseForm } from '../services/UseForm';
import { isEmailValid } from '../services/Validators';
import { createUploadTask } from '../services/FileHandler';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

export const Account = () => {
  const { currentUser } = useContext(UserContext);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetError = () => {
    setErrorMessage('');
  };

  const resetConfirm = () => {
    setConfirmMessage('');
  };

  const [values, handleChange] = UseForm({
    username: currentUser.displayName,
    email: currentUser.email,
    oldPassword: '',
    newPassword: '',
    confirmUsername: '',
  });
  const { username, email, oldPassword, newPassword, confirmUsername } = values;

  const handleFileUpload = ({ target }) => {
    if (!target.files[0]) return;
    var uploadTask = createUploadTask(currentUser.uid, target.files[0]);

    uploadTask.on(
      Firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress} % done`);
        switch (snapshot.state) {
          case Firebase.storage.TaskState.PAUSED:
            console.log(`Upload is paused`);
            break;
          case Firebase.storage.TaskState.RUNNING:
            console.log(`Upload is running`);
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
          try {
            await changePhoto(downloadURL);
            setConfirmMessage('Avatar has been set.');
          } catch (error) {
            setErrorMessage(error.message);
          }
        });
      }
    );
  };

  const handleSignOut = async () => {
    signOut();
    return <Redirect to='/signin' />;
  };
  const handleChangeUsername = async () => {
    try {
      await changeUsername(username);
      setConfirmMessage('Username has been set.');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const handleChangeEmail = async () => {
    try {
      await changeEmail(email);
      setConfirmMessage('Email has been set.');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const handleChangePassword = async () => {
    try {
      await changePassword(newPassword);
      setConfirmMessage('Password has been set.');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const handleRemovePhoto = async () => {
    try {
      await changePhoto('');
      setConfirmMessage('Avatar has been removed.');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const handleDeleteUser = async () => {
    try {
      await deleteUser();
      return <Redirect to='/signin' />;
    } catch (error) {
      setErrorMessage(error.message);
    }
    handleClose();
  };
  const handleResetPassword = async () => {
    try {
      await resetPassword(currentUser.email);
      setConfirmMessage('Password reset link has been sent to your email!');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const handleVerifyEmail = async () => {
    try {
      await verifyEmail();
      setConfirmMessage('Verification link has been sent to your email');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <React.Fragment>
      <Typography component='h1' variant='h2' color='textPrimary' gutterBottom>
        Hello, {currentUser.displayName || currentUser.email.split('@')[0]}!
      </Typography>
      <Typography variant='h5' color='textSecondary' paragraph>
        Manage your account.
      </Typography>
      <Button
        onClick={handleSignOut}
        fullWidth
        variant='contained'
        color='primary'
      >
        Sign out
      </Button>
      <br />
      <br />
      <Divider />
      <br />
      <br />
      <TextField
        label='Username'
        value={username}
        name='username'
        onChange={handleChange}
        variant='outlined'
        fullWidth
      />
      <Button
        disabled={username === currentUser.displayName}
        onClick={handleChangeUsername}
        fullWidth
        variant='contained'
        color='primary'
      >
        Set
      </Button>
      <TextField
        label='Email'
        value={email}
        name='email'
        onChange={handleChange}
        fullWidth
        variant='outlined'
      />
      <Button
        disabled={email === currentUser.email || !isEmailValid(email)}
        onClick={handleChangeEmail}
        fullWidth
        variant='contained'
        color='primary'
      >
        Set
      </Button>
      <TextField
        label='ID'
        value={currentUser.uid}
        variant='outlined'
        disabled
        fullWidth
      />
      <br />
      <br />
      <Divider />
      <br />
      <br />
      <TextField
        variant='outlined'
        fullWidth
        name='oldPassword'
        label='Old password'
        type='password'
        id='oldPassword'
        autoComplete='current-password'
        onChange={handleChange}
      />

      <TextField
        variant='outlined'
        fullWidth
        name='newPassword'
        label='New password'
        type='password'
        id='newPassword'
        autoComplete='current-password'
        value={newPassword}
        onChange={handleChange}
      />
      <Button
        disabled={newPassword === '' || oldPassword !== currentUser.password}
        onClick={handleChangePassword}
        fullWidth
        variant='contained'
        color='primary'
      >
        Set
      </Button>

      <Button
        onClick={handleResetPassword}
        fullWidth
        variant='contained'
        color='primary'
      >
        Reset by email
      </Button>
      <br />
      <br />
      <Divider />
      <br />
      <br />
      <FormControlLabel
        disabled
        control={
          <Checkbox checked={currentUser.emailVerified} name='checkedE' />
        }
        label={
          currentUser.emailVerified
            ? 'You are verified'
            : 'You are not yet verified'
        }
      />
      {!currentUser.emailVerified && (
        <Button
          onClick={handleVerifyEmail}
          fullWidth
          variant='contained'
          color='primary'
        >
          Send verification email
        </Button>
      )}
      <br />
      <br />
      <Divider />
      <br />
      <br />
      <StyledBadge
        overlap='circle'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant='dot'
      >
        <Avatar alt='Remy Sharp' src={currentUser.photoURL} />
      </StyledBadge>

      <React.Fragment>
        <input
          type='file'
          accept='image/*'
          id='contained-button-file'
          onChange={handleFileUpload}
          hidden
        />
        <label htmlFor='contained-button-file'>
          <Button
            fullWidth
            variant='contained'
            component='span'
            color='primary'
          >
            Upload
          </Button>
        </label>
        <Button
          disabled={!currentUser.photoURL}
          onClick={handleRemovePhoto}
          fullWidth
          variant='contained'
          color='primary'
        >
          Remove
        </Button>
      </React.Fragment>

      <br />
      <br />
      <Divider />
      <br />
      <br />
      <Button
        onClick={handleClickOpen}
        fullWidth
        variant='contained'
        color='primary'
      >
        Delete account
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Delete account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to delete your user account? <br /> Type your
            username to confirm
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            margin='dense'
            id='name'
            label='Username'
            name='confirmUsername'
            value={confirmUsername}
            onChange={handleChange}
            variant='outlined'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' variant='contained'>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteUser}
            disabled={confirmUsername !== currentUser.displayName}
            color='secondary'
            variant='contained'
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={confirmMessage !== ''}
        autoHideDuration={6000}
        onClose={resetConfirm}
      >
        <Alert onClose={resetConfirm} severity='success'>
          {confirmMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorMessage !== ''}
        autoHideDuration={6000}
        onClose={resetError}
      >
        <Alert onClose={resetError} severity='error'>
          {errorMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};
