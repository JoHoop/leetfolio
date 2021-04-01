import React from 'react';
import ReactDOMServer from 'react-dom/server';
import html2pdf from 'html2pdf.js';
import { Resume } from '../pages/Resume';
import { ResumeProvider } from '../components/Resume/ResumeProvider';

export const Download = () => {
  const html = ReactDOMServer.renderToStaticMarkup(
    <ResumeProvider>
      <Resume />
    </ResumeProvider>
  );

  console.log(html);

  const opt = {
    margin: 0,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 1 },
    enableLinks: true,
    html2canvas: { scale: 8 },
    jsPDF: { format: 'a4', orientation: 'portrait' },
  };

  html2pdf().set(opt).from(html, 'string').save();
};
