import React, { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import { Tooltip, IconButton, Zoom } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

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
      >
        {theme === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};
