import { Apple as AppleIcon } from 'mdi-material-ui';
import { Github as GitHubIcon } from 'mdi-material-ui';
import { Google as GoogleIcon } from 'mdi-material-ui';

export const authProviders = [
  {
    id: 'apple.com',
    color: '#000000',
    icon: <AppleIcon />,
    name: 'Apple',
  },
  {
    id: 'github.com',
    color: '#24292e',
    icon: <GitHubIcon />,
    name: 'GitHub',
    scopes: ['repo'],
  },
  {
    id: 'google.com',
    color: '#ea4335',
    icon: <GoogleIcon />,
    name: 'Google',
  },
];
