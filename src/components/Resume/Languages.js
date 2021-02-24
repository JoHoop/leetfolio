import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SectionHeader } from './fragments/SectionHeader';
import { Spacing } from './fragments/Spacing';

const useStyles = makeStyles((theme) => ({
  language: {
    fontWeight: 600,
  },
  level: {
    color: '#858585',
    padding: 0,
    margin: 0,
  },
}));

export const Languages = ({ languages }) => {
  const classes = useStyles();

  const items = languages.map((item) => {
    const { language, fluency } = item;
    return (
      <Spacing small>
        <dl>
          <dt className={classes.language}>{language}</dt>
          <dd className={classes.level}>{fluency}</dd>
        </dl>
      </Spacing>
    );
  });

  return (
    <Spacing>
      <SectionHeader>Languages</SectionHeader>
      {items}
    </Spacing>
  );
};
