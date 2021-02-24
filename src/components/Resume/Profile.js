import React from 'react';
import { SectionHeader } from './fragments/SectionHeader';
import { Spacing } from './fragments/Spacing';
import { Line } from './fragments/Line';

export const Profile = ({ basics }) => {
  return (
    <Spacing>
      <SectionHeader>Profile</SectionHeader>
      <Line>
        <p>{basics.summary}</p>
      </Line>
    </Spacing>
  );
};
