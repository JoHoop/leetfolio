import React from 'react';

export const Languages = (props) => {
  const languages = props.languages.map((item) => {
    const { language, fluency } = item;

    return (
      <ul>
        <li>
          <h3>{language}</h3>
          <p>{fluency}</p>
        </li>
      </ul>
    );
  });

  return (
    <section>
      <h2>Languages</h2>
      <div className={'wrapper'}>{languages}</div>
    </section>
  );
};
