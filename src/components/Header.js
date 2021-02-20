import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Zoom,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeToggle } from '../theme/ThemeToggle';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  iconButton: {
    height: '2.5rem',
    width: '2.5rem',
  },
  icon: {
    fontSize: '1.25rem',
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

export const Header = () => {
  const classes = useStyles();

  return (
    <AppBar
      position='static'
      color='default'
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant='h6'
          color='inherit'
          noWrap
          className={classes.toolbarTitle}
        >
          React App
        </Typography>
        <nav>
          <Link
            component={NavLink}
            to='/'
            variant='button'
            color='textPrimary'
            className={classes.link}
            activeClassName='Mui-selected'
          >
            Home
          </Link>
          <Link
            component={NavLink}
            to='/editor'
            variant='button'
            color='textPrimary'
            className={classes.link}
            activeClassName='Mui-selected'
          >
            Editor
          </Link>
          <Link
            component={NavLink}
            to='/resume'
            variant='button'
            color='textPrimary'
            className={classes.link}
            activeClassName='Mui-selected'
          >
            Resume
          </Link>
          <ThemeToggle />
          <Tooltip
            title={'GitHub repo'}
            placement='bottom'
            TransitionComponent={Zoom}
          >
            <IconButton
              color='inherit'
              aria-label={'GitHub repo'}
              className={classes.iconButton}
              href='https://github.com/JoHoop/CimpleV'
              target='_blank'
              rel='noreferrer'
            >
              <GitHubIcon className={classes.icon} />
            </IconButton>
          </Tooltip>
        </nav>
      </Toolbar>
    </AppBar>
  );
};