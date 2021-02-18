import React from 'react';
import { Typography } from '@material-ui/core';

export const Content = () => {
  return (
    <>
      <Typography component='h1' variant='h2' color='textPrimary' gutterBottom>
        Hero content
      </Typography>
      <Typography variant='h5' color='textSecondary' paragraph>
        Something short and leading about the collection below—its contents, the
        creator, etc. Make it short and sweet, but not too short so folks
        don&apos;t simply skip over it entirely.
      </Typography>
    </>
  );
};
