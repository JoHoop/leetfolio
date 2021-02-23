import React from 'react';
import { Box } from '@material-ui/core';

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
      <h2>Languages</h2>
      <Box className={'wrapper'}>{items}</Box>
    </section>
  );
};
