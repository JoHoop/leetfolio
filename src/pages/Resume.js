import React, { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { ResumeContext } from '../components/Resume/ResumeProvider';
import { Page } from '../components/Resume/Page';
import { Card } from '../components/Resume/Card';
import { Profile } from '../components/Resume/Profile';
import { Experience } from '../components/Resume/Experience';
import { Education } from '../components/Resume/Education';
import { Details } from '../components/Resume/Details';
import { Languages } from '../components/Resume/Languages';
import { Tools } from '../components/Resume/Tools';
import { device } from '../components/Resume/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    padding: '4em 2em 0em',
    [`@media ${device.laptop}`]: {
      padding: '4em 4em 0em',
      flex: '70%',
    },
  },
  sidebar: {
    padding: '0em 2em 0em',
    [`@media ${device.laptop}`]: {
      padding: '4em 3em 0em',
      flex: '30%',
    },
    borderLeft: '1px solid #ebebeb',
  },
  footer: {
    borderTop: '1px solid #ebebeb',
    padding: '2em',
    [`@media ${device.laptop}`]: {
      padding: '2em 4em 2em',
    },
    '& p': {
      margin: 0,
    },
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    [`@media ${device.laptop}`]: {
      flexDirection: 'row',
    },
  },
}));

const GlobalStyle = createGlobalStyle`
  body {

    padding: 0;
    margin: 0;
    background-color: #FFF;
    @media ${device.laptop} {
        background-color: #329CB9;
        padding: 2em;
    }

    font-family: "Source Sans Pro", sans-serif;
    color: #303030;
  }

  a {
    text-decoration: none;
    color: #329CB9;
  }

  p, li {
    color: #858585;
    line-height: 1.5;
    @media ${device.laptop} {
        white-space: pre-line;
    }
  }

  ul {
    padding: 0;
    list-style-type: none;
  }
`;

export const Resume = () => {
  const classes = useStyles();
  const { resume } = useContext(ResumeContext);
  const { basics, education, work, skills, languages } = resume;

  return (
    <React.Fragment>
      <GlobalStyle />
      <Page>
        <div className={classes.info}>
          <div className={classes.main}>
            <Card basics={basics} />
            <Profile basics={basics} />
            <Experience work={work} />
            <Education education={education} />
          </div>
          <div className={classes.sidebar}>
            <Details basics={basics} />
            <Languages languages={languages} />
            <Tools skills={skills} />
          </div>
        </div>
        <div className={classes.footer}>
          <p>
            Copyright {new Date().getFullYear()} &copy;
            {basics.name} |{' '}
            <a
              href={'https://github.com/JoHoop/leetfolio'}
              target={'_blank'}
              rel={'noreferrer'}
            >
              GitHub
            </a>
          </p>
        </div>
      </Page>
    </React.Fragment>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const Fullscreen = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <IconButton
          edge='start'
          color='inherit'
          onClick={handleClose}
          aria-label='close'
        >
          <CloseIcon />
        </IconButton>
        <Resume />
      </Dialog>
    </React.Fragment>
  );
};
