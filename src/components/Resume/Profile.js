import React from 'react';
import { Box } from '@material-ui/core';

export const Profile = ({ basics }) => {
  const summary = basics.summary;
  return (
    <section id='profile'>
      <h2>Profile</h2>
      <Box className={'wrapper'}>
        <p>{summary}</p>
      </Box>
    </section>
  );
};
