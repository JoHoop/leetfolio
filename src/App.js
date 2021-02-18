import React from 'react';
import { Landing } from './Pages/Landing';
import { ThemeProvider } from './Theme/ThemeProvider';
import { CssBaseline } from '@material-ui/core';

export const App = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Landing />
    </ThemeProvider>
  );
};
