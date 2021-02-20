import React from 'react';

export const Experience = ({ work }) => {
  const items = work.map((experience) => {
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
        <ul>{items}</ul>
      </div>
    </section>
  );
};
