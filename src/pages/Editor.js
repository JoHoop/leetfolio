import React from 'react';
import Form from '@rjsf/material-ui';
import { schema } from '../data/schema';

export const Editor = () => {
  return <Form schema={schema} />;
};
