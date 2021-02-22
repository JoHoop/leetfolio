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

  const handleCapture = ({ target }) => {
    const file = target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function () {
        const content = JSON.parse(reader.result);
        setResume(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <React.Fragment>
      <input
        type='file'
        accept='application/json'
        id='contained-button-file'
        onChange={handleCapture}
        hidden
      />
      <label htmlFor='contained-button-file'>
        <Button variant='contained' component='span'>
          Upload
        </Button>
      </label>
      <Button
        variant='contained'
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(resume)
        )}`}
        download='resume.json'
      >
        Download
      </Button>
      <Button variant='contained' onClick={setDefault}>
        Load default
      </Button>

      <Button variant='contained' onClick={setEmpty}>
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
    </React.Fragment>
  );
};
