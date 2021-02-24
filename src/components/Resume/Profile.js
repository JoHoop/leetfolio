import React from 'react';
import { Box } from '@material-ui/core';
import { SectionHeader } from './fragments/SectionHeader';

export const Profile = ({ basics }) => {
  const summary = basics.summary;
  return (
    <section id='profile'>
      <SectionHeader>Profile</SectionHeader>
      <Box className={'wrapper'}>
        <p>{summary}</p>
      </Box>
    </section>
  );
};
