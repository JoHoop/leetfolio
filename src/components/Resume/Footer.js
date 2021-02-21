import React from 'react';
import { Box } from '@material-ui/core';

export const Footer = ({ basics }) => {
  const { name } = basics;

  return (
    <Box className={'footer'}>
      <p>
        Copyright {new Date().getFullYear()} &copy; {name}
        {' | '}
        <a
          target={'_blank'}
          rel={'noreferrer'}
          href={'https://github.com/JoHoop/leetfolio'}
        >
          GitHub
        </a>
      </p>
    </Box>
  );
};
