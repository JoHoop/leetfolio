import React from 'react';
import { Box } from '@material-ui/core';
import { SectionHeader } from './fragments/SectionHeader';

export const Experience = ({ work }) => {
  const items = work.map((experience) => {
    const {
      company,
      website,
      position,
      startDate,
      endDate,
      summary,
    } = experience;

    return (
      <li key={startDate}>
        <h3>
          {position}
          {' @ '}
          <a target={'_blank'} rel={'noreferrer'} href={website}>
            {company}
          </a>
        </h3>
        <span>
          {startDate} - {endDate}
        </span>
        <p>{summary}</p>
      </li>
    );
  });

  return (
    <section className={'lists'} id='experience'>
      <SectionHeader>Experience</SectionHeader>
      <Box className={'wrapper'}>
        <ul>{items}</ul>
      </Box>
    </section>
  );
};
