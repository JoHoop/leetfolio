import React from 'react';

export const Experience = (props) => {
  const experienceItems = props.work.map((experience) => {
    const {
      company,
      website,
      position,
      startDate,
      endDate,
      summary,
    } = experience;

    return (
      <li>
        <h3>
          {position}
          {' @ '}
          <a target={'_blank'} rel={'noreferrer'} href={website}>
            {company}
          </a>
        </h3>
        <span>
          {startDate} - {endDate}
        </span>
        <p>{summary}</p>
      </li>
    );
  });

  return (
    <section className={'lists'} id='experience'>
      <h2>Experience</h2>
      <div className={'wrapper'}>
        <ul>{experienceItems}</ul>
      </div>
    </section>
  );
};
