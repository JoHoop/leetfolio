import React from 'react';
import { Box } from '@material-ui/core';
import { SectionHeader } from './fragments/SectionHeader';

export const Education = ({ education }) => {
  const items = education.map((education) => {
    const { area, institution, startDate, endDate, studyType } = education;

    return (
      <li key={startDate}>
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
      <SectionHeader>Education</SectionHeader>
      <Box className={'wrapper'}>
        <ul>{items}</ul>
      </Box>
    </section>
  );
};
