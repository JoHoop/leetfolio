import React from 'react';

export const Tools = () => {
  return (
    <section>
      <h2>Tools</h2>
      <div className={'wrapper'}>
        <ul>
          <li>
            <p>Adobe Photoshop</p>
            <div className={'skillbar'}>
              <div className={'fill'} style={{ width: '95%' }}></div>
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <p>Adobe Illustrator</p>
            <div className={'skillbar'}>
              <div className={'fill'} style={{ width: '85%' }}></div>
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <p>Adobe After Effects</p>
            <div className={'skillbar'}>
              <div className={'fill'} style={{ width: '55%' }}></div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
