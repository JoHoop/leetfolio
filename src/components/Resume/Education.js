import React from 'react';

export const Education = (props) => {
  const educationItems = props.education.map((education) => {
    const { area, institution, startDate, endDate, studyType } = education;

    return (
      <li>
        <h3>
          {area} @ {institution}
        </h3>
        <span>
          {startDate} - {endDate}
        </span>
        <p>{studyType}</p>
      </li>
    );
  });

  return (
    <section className={'lists'} id='education'>
      <h2>Education</h2>
      <div className={'wrapper'}>
        <ul>{educationItems}</ul>
      </div>
    </section>
  );
};
