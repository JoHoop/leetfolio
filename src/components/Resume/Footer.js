import React from 'react';

export const Footer = ({ basics }) => {
  const { name } = basics;

  return (
    <div className={'footer'}>
      <p>
        Copyright {new Date().getFullYear()} &copy; {name}
        {' | '}
        <a
          target={'_blank'}
          rel={'noreferrer'}
          href={'https://github.com/JoHoop/CimpleV'}
        >
          GitHub
        </a>
      </p>
    </div>
  );
};
