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

export const Education = ({ education }) => {
  const classes = useStyles();

  const items = education.map((education) => {
    const { area, institution, startDate, endDate, studyType } = education;
    return (
      <Spacing small>
        <h3 className={classes.experienceTitle}>
          {area} @ {institution}
        </h3>
        <p className={classes.experienceDate}>
          {startDate} - {endDate}
        </p>
        <p className={classes.experienceParagraph}>{studyType}</p>
      </Spacing>
    );
  });

  return (
    <Spacing>
      <SectionHeader>Education</SectionHeader>
      <Line>{items}</Line>
    </Spacing>
  );
};
