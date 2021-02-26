import React, { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import { Tooltip, IconButton, Zoom, makeStyles } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    height: '3rem',
    width: '3rem',
  },
  icon: {
    fontSize: '1.5rem',
  },
}));

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const classes = useStyles();

  return (
    <Tooltip
      title={'Toggle theme'}
      placement='bottom'
      TransitionComponent={Zoom}
    >
      <IconButton
        color='inherit'
        onClick={toggleTheme}
        aria-label={'Toggle theme'}
        className={classes.iconButton}
      >
        {theme === 'light' ? (
          <Brightness7Icon className={classes.icon} />
        ) : (
          <Brightness4Icon className={classes.icon} />
        )}
      </IconButton>
    </Tooltip>
  );
};
