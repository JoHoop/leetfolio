import React from 'react';
import { Box } from '@material-ui/core';
import { SectionHeader } from './fragments/SectionHeader';
import { Spacing } from './fragments/Spacing';

export const Details = ({ basics }) => {
  const { birthday, location, phone, email } = basics;

  return (
    <Spacing>
      <SectionHeader>Details</SectionHeader>
      <Spacing small>
        <ul>
          <li key={'birthday'}>{birthday}</li>
          <li key={'address'}>{location.address}</li>
          <li key={'postalCode'}>{location.postalCode}</li>
          <li key={'region'}>{location.region}</li>
          <li key={'phone'}>{phone}</li>
          <li key={'email'}>
            <a href={`mailto:${email}`}>{email}</a>
          </li>
        </ul>
      </Spacing>
    </Spacing>
  );
};
