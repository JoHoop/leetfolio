import React, { useState } from 'react';
import Form from '@rjsf/material-ui';
import metaSchemaDraft04 from 'ajv/lib/refs/json-schema-draft-04.json';
import schema from '../data/schema.json';
import resumeData from '../data/resume.json';

console.log(JSON.stringify(schema));

export const Editor = () => {
  const [formData, setFormData] = useState(resumeData);

  const onChange = ({ formData }) => {
    setFormData(formData);
    console.log('onChange: ', formData);
  };

  const onSubmit = (value) => {
    console.log('onSubmit: %s', JSON.stringify(value));
  };

  const onError = () => {
    console.log('errors');
  };

  return (
    <Form
      schema={schema}
      formData={formData}
      onChange={onChange}
      onSubmit={onSubmit}
      onError={onError}
      additionalMetaSchemas={[metaSchemaDraft04]}
      liveValidate
    />
  );
};
