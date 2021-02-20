import React, { useContext } from 'react';
import { ResumeContext } from '../components/Resume/ResumeProvider';
import Form from '@rjsf/material-ui';
import metaSchemaDraft04 from 'ajv/lib/refs/json-schema-draft-04.json';
import schema from '../data/schema.json';

export const Editor = () => {
  const { resume, setResume } = useContext(ResumeContext);

  const onChange = ({ formData }) => {
    setResume(formData);
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
      formData={resume}
      onChange={onChange}
      onSubmit={onSubmit}
      onError={onError}
      additionalMetaSchemas={[metaSchemaDraft04]}
      liveValidate
    />
  );
};
