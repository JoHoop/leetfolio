import React, { useState, createContext } from 'react';
import resumeData from '../../data/resume.json';

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resume, setResume] = useState(resumeData);

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
