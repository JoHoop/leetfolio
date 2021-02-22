import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

export const primary = '#329cb9';
export const black = '#111111';
export const white = '#fafafa';

export const LightTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: primary,
        dark: white,
        light: black,
      },
      color: black,
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            color: black,
            backgroundColor: white,
          },
        },
      },
    },
  })
);

export const DarkTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: primary,
        dark: black,
        light: white,
      },
      color: white,
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            color: white,
            backgroundColor: black,
          },
        },
      },
    },
  })
);
