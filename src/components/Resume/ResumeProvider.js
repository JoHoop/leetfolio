import React, { useState, createContext } from 'react';
import resumeData from '../../data/resume.json';

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resume, setResume] = useState(resumeData);

  const setEmpty = () => {
    setResume({});
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        setEmpty,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
