import React from 'react';
import { Box } from '@material-ui/core';

export const Details = ({ basics }) => {
  const { birthday, location, phone, email } = basics;

  return (
    <section id='details'>
      <h2>Details</h2>
      <Box className={'wrapper'}>
        <ul>
          <li>{birthday}</li>
          <li>{location.address}</li>
          <li>{location.postalCode}</li>
          <li>{location.region}</li>
          <li>{phone}</li>
          <li>
            <a href={`mailto:${email}`}>{email}</a>
          </li>
        </ul>
      </Box>
    </section>
  );
};
