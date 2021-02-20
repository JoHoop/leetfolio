import deepmerge from 'deepmerge';

import resumeData from './resume.json';
import additionalData from './additionals.json';

export const jsonData = deepmerge(resumeData, additionalData);
