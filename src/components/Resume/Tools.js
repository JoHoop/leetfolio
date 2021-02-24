import React from 'react';
import { Box } from '@material-ui/core';
import { SectionHeader } from './fragments/SectionHeader';

export const Tools = () => {
  return (
    <section>
      <SectionHeader>Tools</SectionHeader>
      <Box className={'wrapper'}>
        <ul>
          <li key={'photoshop'}>
            <p>Adobe Photoshop</p>
            <Box className={'skillbar'}>
              <Box className={'fill'} style={{ width: '95%' }}></Box>
            </Box>
          </li>
        </ul>
        <ul>
          <li key={'illustrator'}>
            <p>Adobe Illustrator</p>
            <Box className={'skillbar'}>
              <Box className={'fill'} style={{ width: '85%' }}></Box>
            </Box>
          </li>
        </ul>
        <ul>
          <li key={'aftereffects'}>
            <p>Adobe After Effects</p>
            <Box className={'skillbar'}>
              <Box className={'fill'} style={{ width: '55%' }}></Box>
            </Box>
          </li>
        </ul>
      </Box>
    </section>
  );
};
