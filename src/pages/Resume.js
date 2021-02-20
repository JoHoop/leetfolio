import React from 'react';
import '../components/Resume/resume.css';
import { Card } from '../components/Resume/Card';
import { Details } from '../components/Resume/Details';
import { Education } from '../components/Resume/Education';
import { Experience } from '../components/Resume/Experience';
import { Footer } from '../components/Resume/Footer';
import { Languages } from '../components/Resume/Languages';
import { Profile } from '../components/Resume/Profile';
import { Tools } from '../components/Resume/Tools';

import { jsonData as data } from '../data/jsonData';

export const Resume = () => {
  const { basics, education, work, skills, languages } = data;

  return (
    <div id='main-wrapper'>
      <div id='information'>
        <Card basics={basics} />
        <Profile basics={basics} />
        <Experience work={work} />
        <Education education={education} />
      </div>
      <aside>
        <Details basics={basics} />
        <Languages languages={languages} />
        <Tools skills={skills} />
      </aside>
      <Footer basics={basics} />
    </div>
  );
};
