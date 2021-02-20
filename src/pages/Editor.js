import React, { useState } from 'react';
import Form from '@rjsf/material-ui';
import { schema } from '../data/schema';
import { jsonData } from '../data/jsonData';

export const Editor = () => {
  const [formData, setFormData] = useState(jsonData);

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
    />
  );
};
