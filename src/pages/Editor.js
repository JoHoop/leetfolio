import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { ResumeContext } from '../components/Resume/ResumeProvider';
import Form from '@rjsf/material-ui';
import metaSchemaDraft04 from 'ajv/lib/refs/json-schema-draft-04.json';
import schema from '../data/schema.json';

export const Editor = () => {
  const { resume, setResume, setDefault, setEmpty } = useContext(ResumeContext);

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
    <>
      <Button color='primary' onClick={setDefault}>
        Load
      </Button>
      <Button color='secondary' onClick={setEmpty}>
        Reset
      </Button>
      <Form
        schema={schema}
        formData={resume}
        onChange={onChange}
        onSubmit={onSubmit}
        onError={onError}
        additionalMetaSchemas={[metaSchemaDraft04]}
        liveValidate
      />
    </>
  );
};
