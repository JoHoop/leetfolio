import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Box, Typography, makeStyles } from '@material-ui/core';
import { ResumeContext } from '../components/Resume/ResumeProvider';
import Form from '@rjsf/material-ui';
import metaSchemaDraft04 from 'ajv/lib/refs/json-schema-draft-04.json';
import schema from '../data/schema.json';
import { Clear, GetApp, Publish, Save } from '@material-ui/icons';
import PageviewIcon from '@material-ui/icons/Pageview';

const useStyles = makeStyles((theme) => ({
  buttons: {
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
}));

export const Editor = () => {
  const classes = useStyles();
  const { resume, setResume, setEmpty } = useContext(ResumeContext);

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
      <Typography component='h1' variant='h2' color='textPrimary' gutterBottom>
        Editor
      </Typography>
      <Typography variant='h5' color='textSecondary' paragraph>
        Update your resume.json file. Your data will never be saved on the
        server and is lost on reload.
      </Typography>
      <Box className={classes.buttons}>
        <input
          type='file'
          accept='application/json'
          id='contained-button-file'
          onChange={handleCapture}
          hidden
        />
        <label htmlFor='contained-button-file'>
          <Button variant='outlined' startIcon={<Publish />} component='span'>
            Upload
          </Button>
        </label>
        <Button
          variant='outlined'
          startIcon={<GetApp />}
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(resume, null, 2)
          )}`}
          download='resume.json'
        >
          Download
        </Button>
        <Button
          variant='outlined'
          startIcon={<PageviewIcon />}
          component={NavLink}
          to={'/resume'}
        >
          Preview
        </Button>
        <Button variant='outlined' startIcon={<Clear />} onClick={setEmpty}>
          Reset
        </Button>
      </Box>

      <Form
        schema={schema}
        formData={resume}
        onChange={onChange}
        onSubmit={onSubmit}
        onError={onError}
        additionalMetaSchemas={[metaSchemaDraft04]}
        autoComplete='on'
        liveValidate
      >
        <Button variant='outlined' startIcon={<Save />} type='submit'>
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
};
