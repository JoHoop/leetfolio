import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { SectionHeader } from './fragments/SectionHeader';
import { Spacing } from './fragments/Spacing';

const useStyles = makeStyles((theme) => ({
  tool: {
    marginBlockStart: '0px',
    marginBlockEnd: '0px',
  },
  skillbar: {
    width: '100%',
    height: '3px',
    backgroundColor: '#ebebeb',
    borderRadius: '3px',
    position: 'relative',
    overflow: 'hidden',
  },
  fill: {
    borderRadius: '3px 0 0 3px',
    width: '100%',
    height: '3px',
    backgroundColor: '#4fb4cf',
    backgroundImage: 'linear-gradient(135deg, #4fb4cf, #2eafd3)',
  },
}));

export const Tools = () => {
  const classes = useStyles();

  return (
    <Spacing>
      <SectionHeader>Tools</SectionHeader>
      <Spacing small>
        <ul>
          <li key={'photoshop'}>
            <p className={classes.tool}>Adobe Photoshop</p>
            <Box className={classes.skillbar}>
              <Box className={classes.fill} style={{ width: '95%' }}></Box>
            </Box>
          </li>
        </ul>
        <ul>
          <li key={'illustrator'}>
            <p className={classes.tool}>Adobe Illustrator</p>
            <Box className={classes.skillbar}>
              <Box className={classes.fill} style={{ width: '85%' }}></Box>
            </Box>
          </li>
        </ul>
        <ul>
          <li key={'aftereffects'}>
            <p className={classes.tool}>Adobe After Effects</p>
            <Box className={classes.skillbar}>
              <Box className={classes.fill} style={{ width: '55%' }}></Box>
            </Box>
          </li>
        </ul>
      </Spacing>
    </Spacing>
  );
};
