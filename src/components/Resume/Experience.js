import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Spacing } from './fragments/Spacing';
import { SectionHeader } from './fragments/SectionHeader';
import { Line } from './fragments/Line';

const useStyles = makeStyles((theme) => ({
  experienceTitle: {
    margin: 0,
    padding: 0,
    fontSize: '1em',
    fontWeight: 600,
  },
  experienceDate: {
    margin: 0,
    color: '#329cb9',
  },
  experienceParagraph: {
    margin: 0,
  },
}));

export const Experience = ({ work }) => {
  const classes = useStyles();

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
      <Spacing small>
        <h3 className={classes.experienceTitle}>
          {position}
          {' @ '}
          <a target={'_blank'} rel={'noreferrer'} href={website}>
            {company}
          </a>
        </h3>
        <p className={classes.experienceDate}>
          {startDate} - {endDate}
        </p>
        <p className={classes.experienceParagraph}>{summary}</p>
      </Spacing>
    );
  });

  return (
    <Spacing>
      <SectionHeader>Experience</SectionHeader>
      <Line>{items}</Line>
    </Spacing>
  );
};
