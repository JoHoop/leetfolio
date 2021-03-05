import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import { Link as LinkIcon, LinkOff as LinkOffIcon } from '@material-ui/icons';
import { Loading } from '../components/Loading';
import { Notification } from '../components/Notification';
import { authProviders } from '../data/authProviders';
import {
  linkAuthProvider,
  unlinkAuthProvider,
  authProviderData,
} from '../services/Auth.js';

export const AuthProvidersLinks = ({ mobile }) => {
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const setError = (error) => {
    setNotify({
      isOpen: true,
      message: error.message,
      type: 'error',
    });
  };

  const handleLink = async (authProvider) => {
    setLoading(true);
    try {
      await linkAuthProvider(authProvider, mobile);
      setNotify({
        isOpen: true,
        message: 'Accounts successfully linked.',
        type: 'success',
      });
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const handleUnlink = async (authProvider) => {
    setLoading(true);
    try {
      await unlinkAuthProvider(authProvider);
      setNotify({
        isOpen: true,
        message: 'Accounts successfully unlinked',
        type: 'success',
      });
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return (
    <React.Fragment>
      <List disablePadding>
        {authProviders.map((authProvider) => {
          const providerData = authProviderData(authProvider.id);
          let identifier = null;

          if (providerData) {
            const displayName = providerData.displayName;
            const emailAddress = providerData.email;
            const phoneNumber = providerData.phoneNumber;

            identifier = displayName || emailAddress || phoneNumber;
          }

          return (
            <ListItem key={authProvider.id}>
              <ListItemIcon>
                <Box color={authProvider.color}>{authProvider.icon}</Box>
              </ListItemIcon>

              {providerData && (
                <ListItemText
                  primary={authProvider.name}
                  secondary={identifier}
                />
              )}

              {!providerData && <ListItemText primary={authProvider.name} />}

              <ListItemSecondaryAction>
                {providerData && (
                  <Tooltip title='Unlink' placement='left'>
                    <IconButton onClick={() => handleUnlink(authProvider)}>
                      <LinkOffIcon />
                    </IconButton>
                  </Tooltip>
                )}

                {!providerData && (
                  <Tooltip title='Link' placement='left'>
                    <IconButton onClick={() => handleLink(authProvider)}>
                      <LinkIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <Notification notify={notify} setNotify={setNotify} />
      {loading && <Loading />}
    </React.Fragment>
  );
};
