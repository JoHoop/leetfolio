import React from 'react';
import { Typography, Button, Link, Box, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { Illustration } from '../components/Illustration';
import OnlineResume from '../illustrations/onlineResume.svg';

const useStyles = makeStyles((theme) => ({
  buttons: {
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
}));

export const Home = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography component='h1' variant='h2' color='textPrimary' gutterBottom>
        LeetFolio
      </Typography>
      <Typography variant='h5' color='textSecondary' paragraph>
        the best way to create stunning resumes in minutes.
      </Typography>

      <Box className={classes.buttons}>
        <Button
          variant='outlined'
          color='primary'
          component={NavLink}
          to={'/editor'}
        >
          Start now
        </Button>
        <Button
          variant='outlined'
          color='default'
          component={NavLink}
          to={'/resume'}
        >
          Preview
        </Button>
      </Box>

      <br />
      <Illustration illustration={OnlineResume} />
      <br />
      <br />
      <Typography variant='h6' color='textSecondary' paragraph>
        An easy to use web app to build and maintain responsive resumes as
        websites.
      </Typography>
      <Typography variant='h6' color='textSecondary' paragraph>
        Be in control of your data in a raw format, to edit and download at any
        time.
      </Typography>
      <Typography variant='h6' color='textSecondary' paragraph>
        Built on{' '}
        <Link href='https://jsonresume.org' underline='none'>
          JSON Resume
        </Link>
        , the open source initiative to create a JSON-based standard for
        resumes.
      </Typography>
    </React.Fragment>
  );
};
