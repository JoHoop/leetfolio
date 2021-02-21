import React, { useContext } from 'react';
import { Box } from '@material-ui/core';
import { ResumeContext } from '../components/Resume/ResumeProvider';
import { Card } from '../components/Resume/Card';
import { Details } from '../components/Resume/Details';
import { Education } from '../components/Resume/Education';
import { Experience } from '../components/Resume/Experience';
import { Footer } from '../components/Resume/Footer';
import { Languages } from '../components/Resume/Languages';
import { Profile } from '../components/Resume/Profile';
import { Tools } from '../components/Resume/Tools';
import '../components/Resume/resume.css';

export const Resume = () => {
  const { resume } = useContext(ResumeContext);
  const { basics, education, work, skills, languages } = resume;

  return (
    <Box id='main-wrapper'>
      <Box id='information'>
        <Card basics={basics} />
        <Profile basics={basics} />
        <Experience work={work} />
        <Education education={education} />
      </Box>
      <aside>
        <Details basics={basics} />
        <Languages languages={languages} />
        <Tools skills={skills} />
      </aside>
      <Footer basics={basics} />
    </Box>
  );
};
