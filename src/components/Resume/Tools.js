import React from 'react';
import { Box } from '@material-ui/core';

export const Tools = () => {
  return (
    <section>
      <h2>Tools</h2>
      <Box className={'wrapper'}>
        <ul>
          <li>
            <p>Adobe Photoshop</p>
            <Box className={'skillbar'}>
              <Box className={'fill'} style={{ width: '95%' }}></Box>
            </Box>
          </li>
        </ul>
        <ul>
          <li>
            <p>Adobe Illustrator</p>
            <Box className={'skillbar'}>
              <Box className={'fill'} style={{ width: '85%' }}></Box>
            </Box>
          </li>
        </ul>
        <ul>
          <li>
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
