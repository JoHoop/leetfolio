import React from 'react';
import { Box } from '@material-ui/core';

export const Education = ({ education }) => {
  const items = education.map((education) => {
    const { area, institution, startDate, endDate, studyType } = education;

    return (
      <li>
        <h3>
          {area} @ {institution}
        </h3>
        <span>
          {startDate} - {endDate}
        </span>
        <p>{studyType}</p>
      </li>
    );
  });

  return (
    <section className={'lists'} id='education'>
      <h2>Education</h2>
      <Box className={'wrapper'}>
        <ul>{items}</ul>
      </Box>
    </section>
  );
};
