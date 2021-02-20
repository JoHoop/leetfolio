import React from 'react';

export const Card = ({ basics }) => {
  const { name, label, location } = basics;

  return (
    <div id='bio'>
      <figure>
        <img src='./avatar.png' alt='avatar' />
      </figure>
      <div>
        <h1>{name}</h1>
        <span className={'job'}>{label}</span>
        <span className={'location'}>
          {location.city}, {location.region}
        </span>
      </div>
    </div>
  );
};
