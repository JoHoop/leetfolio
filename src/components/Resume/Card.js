import React from 'react';
import { Box } from '@material-ui/core';

export const Card = ({ basics }) => {
  const { name, label, location } = basics;

  return (
    <Box id='card'>
      <figure>
        <img src='./avatar.png' alt='avatar' />
      </figure>
      <Box>
        <h1>{name}</h1>
        <span className={'job'}>{label}</span>
        <span className={'location'}>
          {location.city}, {location.region}
        </span>
      </Box>
    </Box>
  );
};
