import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import {
  Avatar,
  Button,
  Typography,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  CircularProgress,
  TextField,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import firebase from '../services/Firebase';
import { UserContext } from '../services/UserProvider.js';
import {
  signOut,
  changeUsername,
  changeEmail,
  changePassword,
  changePhoto,
  uploadPhoto,
  deletePhoto,
  deleteUser,
  resetPassword,
  verifyEmail,
} from '../services/Auth.js';
import { UseForm } from '../services/UseForm';
import { Notification } from '../components/Notification';
import { Illustration } from '../components/Illustration';
import ShortBio from '../illustrations/shortBio.svg';
import { AuthProvidersLinks } from '../components/AuthProvidersLinks';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  fabProgress: {
    color: 'primary',
    position: 'absolute',
    top: -3,
    left: -1,
    zIndex: 1,
  },
}));

export const Account = () => {
  const classes = useStyles();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'), {
    defaultMatches: true,
    noSsr: true,
  });

  const { currentUser } = useContext(UserContext);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const setSuccessMessage = (message) => {
    setNotify({
      isOpen: true,
      message: message,
      type: 'success',
    });
  };

  const setErrorMessage = (error) => {
    setNotify({
      isOpen: true,
      message: error.message,
      type: 'error',
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [uploading, setUploading] = useState(undefined);

  const [values, handleChange] = UseForm({
    username: currentUser.displayName,
    email: currentUser.email,
    newPassword: '',
    confirmUsername: '',
  });
  const { username, email, newPassword, confirmUsername } = values;

  const handleUploadPhoto = ({ target }) => {
    setUploading(true);
    if (!target.files[0]) return;
    var uploadTask = uploadPhoto(currentUser.uid, target.files[0]);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress} % done`);
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log(`Upload is paused`);
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log(`Upload is running`);
            break;
          default:
            break;
        }
      },
      (error) => {
        setErrorMessage(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
          try {
            await deletePhoto(currentUser.photoURL);
            await changePhoto(downloadURL);
            setUploading(false);
            setSuccessMessage('Avatar has been set.');
          } catch (error) {
            setUploading(false);
            setErrorMessage(error);
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
      setSuccessMessage('Username has been set.');
    } catch (error) {
      setErrorMessage(error);
    }
  };
  const handleChangeEmail = async () => {
    try {
      await changeEmail(email);
      setSuccessMessage('Email has been set.');
    } catch (error) {
      setErrorMessage(error);
    }
  };
  const handleChangePassword = async () => {
    try {
      await changePassword(newPassword);
      setSuccessMessage('Password has been set.');
    } catch (error) {
      setErrorMessage(error);
    }
  };
  const handleRemovePhoto = async () => {
    setUploading(true);
    try {
      await deletePhoto(currentUser.photoURL);
      await changePhoto('');
      setSuccessMessage('Avatar has been removed.');
    } catch (error) {
      setErrorMessage(error);
    }
    setUploading(false);
  };
  const handleDeleteUser = async () => {
    try {
      await deleteUser();
      return <Redirect to='/signin' />;
    } catch (error) {
      setErrorMessage(error);
    }
    handleClose();
  };
  const handleResetPassword = async () => {
    try {
      await resetPassword(currentUser.email);
      setSuccessMessage('Password reset link has been sent to your email!');
    } catch (error) {
      setErrorMessage(error);
    }
  };
  const handleVerifyEmail = async () => {
    try {
      await verifyEmail();
      setSuccessMessage('Verification link has been sent to your email');
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <React.Fragment>
      <Typography component='h1' variant='h2' color='textPrimary' gutterBottom>
        Hello,{' '}
        {currentUser.email
          ? currentUser.displayName || currentUser.email.split('@')[0]
          : 'Anonymous'}
        {'!'}
      </Typography>
      <Typography variant='h5' color='textSecondary' paragraph>
        Manage your account.
      </Typography>
      {!currentUser.emailVerified && (
        <Alert
          variant='outlined'
          severity='warning'
          action={
            <Button onClick={handleVerifyEmail} color='inherit'>
              Send link
            </Button>
          }
        >
          You have not yet verified your email address.
        </Alert>
      )}
      <Button onClick={handleSignOut} variant='outlined' color='primary'>
        Sign out
      </Button>
      <Illustration illustration={ShortBio} />
      <br />
      <br />
      <br />
      <Typography variant='h5' color='textSecondary' paragraph>
        Username
      </Typography>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <TextField
            label='Username'
            value={username}
            name='username'
            onChange={handleChange}
            variant='outlined'
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={username === currentUser.displayName}
            onClick={handleChangeUsername}
            fullWidth
            variant='outlined'
            color='primary'
          >
            Set
          </Button>
        </Grid>
      </Grid>
      <br />
      <br />

      <Typography variant='h5' color='textSecondary' paragraph>
        Email
      </Typography>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <TextField
            label='Email'
            value={email}
            name='email'
            onChange={handleChange}
            fullWidth
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={email === currentUser.email}
            onClick={handleChangeEmail}
            fullWidth
            variant='outlined'
            color='primary'
          >
            Set
          </Button>
        </Grid>
      </Grid>
      <br />
      <br />

      <Typography variant='h5' color='textSecondary' paragraph>
        Password
      </Typography>
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
        disabled={newPassword === ''}
        onClick={handleChangePassword}
        fullWidth
        variant='outlined'
        color='primary'
      >
        Set
      </Button>

      <Button
        onClick={handleResetPassword}
        fullWidth
        variant='outlined'
        color='primary'
      >
        Reset by email
      </Button>
      <br />
      <br />
      <br />

      <Typography variant='h5' color='textSecondary' paragraph>
        Avatar
      </Typography>
      <div className={classes.wrapper}>
        <Avatar
          src={currentUser.photoURL}
          className={classes.avatar}
          alt='Avatar'
        />
        {uploading && (
          <CircularProgress size={123} className={classes.fabProgress} />
        )}
      </div>

      <br />

      <React.Fragment>
        <input
          type='file'
          accept='image/*'
          id='contained-button-file'
          onChange={handleUploadPhoto}
          hidden
        />
        <label htmlFor='contained-button-file'>
          <Button fullWidth variant='outlined' component='span' color='primary'>
            Upload
          </Button>
        </label>
        <Button
          disabled={!currentUser.photoURL}
          onClick={handleRemovePhoto}
          fullWidth
          variant='outlined'
          color='primary'
        >
          Remove
        </Button>
      </React.Fragment>
      <br />
      <br />
      <br />

      <Typography variant='h5' color='textSecondary' paragraph>
        Links
      </Typography>
      <AuthProvidersLinks mobile={isMobile} />
      <br />
      <br />

      <Typography variant='h5' color='textSecondary' paragraph>
        Account
      </Typography>
      <TextField
        label='ID'
        value={currentUser.uid}
        variant='outlined'
        disabled
        fullWidth
      />
      <Button
        onClick={handleClickOpen}
        fullWidth
        variant='outlined'
        color='secondary'
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
          <Button onClick={handleClose} color='primary' variant='outlined'>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteUser}
            disabled={confirmUsername !== currentUser.displayName}
            color='secondary'
            variant='outlined'
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Notification notify={notify} setNotify={setNotify} />
    </React.Fragment>
  );
};
