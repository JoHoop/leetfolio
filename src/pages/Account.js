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
import { UseForm } from '../components/UseForm';
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

  const [imageAsFile, setImageAsFile] = useState('');

  const [values, handleChange] = UseForm({
    username: currentUser.displayName,
    email: currentUser.email,
    password: '',
    confirmUsername: '',
  });
  const { username, email, password, confirmUsername } = values;

  const handleImageAsFile = (event) => {
    const image = event.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const handleFileUpload = () => {
    var uploadTask = createUploadTask(currentUser.uid, imageAsFile);

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
      await changePassword(password);
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
      <Typography variant='h1'>Hello, {currentUser.displayName}!</Typography>
      <p>Manage your account.</p>
      <Button color='teal' onClick={handleSignOut}>
        Sign out
      </Button>
      <br />
      <br />
      <Snackbar
        open={confirmMessage}
        autoHideDuration={6000}
        onClose={setConfirmMessage('')}
      >
        <Alert onClose={setConfirmMessage('')} severity='success'>
          {confirmMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorMessage}
        autoHideDuration={6000}
        onClose={setErrorMessage('')}
      >
        <Alert onClose={setErrorMessage('')} severity='error'>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Divider />
      <Typography variant='h2'>Edit username or email</Typography>
      <label>Username</label>
      <TextField
        id='outlined-basic'
        label='Username'
        value={username}
        onChange={handleChange}
        variant='outlined'
      />
      <Button
        disabled={username === currentUser.displayName}
        onClick={handleChangeUsername}
      >
        Set
      </Button>
      <label>Email</label>
      <TextField
        id='outlined-basic'
        label='Email'
        value={email}
        onChange={handleChange}
        variant='outlined'
      />
      <Button
        disabled={email === currentUser.email || !isEmailValid(email)}
        onClick={handleChangeEmail}
      >
        Set
      </Button>
      <label>ID</label>
      <TextField
        id='outlined-basic'
        label='ID'
        value={currentUser.uid}
        variant='outlined'
        disabled
      />
      <br />
      <Divider />
      <Typography variant='h2'>Change password</Typography>
      <label>Old password</label>
      <TextField
        variant='outlined'
        required
        fullWidth
        name='password'
        label='Old password'
        type='password'
        id='oldPassword'
        autoComplete='current-password'
        value={password}
        onChange={handleChange}
      />
      <label>New password</label>
      <TextField
        variant='outlined'
        required
        fullWidth
        name='password'
        label='New password'
        type='password'
        id='newPassword'
        autoComplete='current-password'
        value={password}
        onChange={handleChange}
      />
      <Button
        disabled={password !== '' && currentUser.password !== ''}
        onClick={handleChangePassword}
      >
        Set
      </Button>

      <br />
      <Divider />
      <Typography variant='h2'>Reset password</Typography>
      <Button onClick={handleResetPassword}>Reset by email</Button>
      <br />
      <Divider />
      <Typography variant='h2'>Verify account</Typography>
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
      <br />
      <br />
      {!currentUser.emailVerified && (
        <Button onClick={handleVerifyEmail}>Send verification email</Button>
      )}
      <br />
      <Divider />
      <Typography variant='h2'>Change avatar</Typography>
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
      <input type='file' accept='image/*' onChange={handleImageAsFile} />
      <br />
      <br />
      <br />
      <Button color='teal' disabled={!imageAsFile} onClick={handleFileUpload}>
        Replace
      </Button>
      <Button disabled={!currentUser.photoURL} onClick={handleRemovePhoto}>
        Remove
      </Button>
      <br />
      <Divider />
      <Typography variant='h2'>Delete account</Typography>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Delete account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          Subscribe
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to delete your user account? Type username to
            confirm
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteUser}
            color='primary'
            disabled={confirmUsername !== currentUser.displayName}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
