import React from 'react';

export const Profile = (props) => {
  const summary = props.basics.summary;
  return (
    <section id='profile'>
      <h2>Profile</h2>
      <div className={'wrapper'}>
        <p>{summary}</p>
      </div>
    </section>
  );
};
