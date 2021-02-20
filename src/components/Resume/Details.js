import React from 'react';

export const Details = (props) => {
  const { birthday, location, phone, email } = props.basics;

  return (
    <section id='details'>
      <h2>Details</h2>
      <div className={'wrapper'}>
        <ul>
          <li>{birthday}</li>
          <li>{location.address}</li>
          <li>{location.postalCode}</li>
          <li>{location.region}</li>
          <li>{phone}</li>
          <li>
            <a href={`mailto:${email}`}>{email}</a>
          </li>
        </ul>
      </div>
    </section>
  );
};
