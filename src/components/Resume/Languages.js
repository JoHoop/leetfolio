import React from 'react';
import { Box } from '@material-ui/core';
import { SectionHeader } from './fragments/SectionHeader';

export const Languages = ({ languages }) => {
  const items = languages.map((item) => {
    const { language, fluency } = item;

    return (
      <ul key={language}>
        <li key={language}>
          <h3>{language}</h3>
          <p>{fluency}</p>
        </li>
      </ul>
    );
  });

  return (
    <section>
      <SectionHeader>Languages</SectionHeader>
      <Box className={'wrapper'}>{items}</Box>
    </section>
  );
};
