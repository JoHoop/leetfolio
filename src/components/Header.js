import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import { signOut } from '../services/Auth.js';
import { UserContext } from '../services/UserProvider';
import {
  Drawer,
  AppBar,
  Button,
  Toolbar,
  List,
  Box,
  Typography,
  Divider,
  IconButton,
  Menu,
  Avatar,
  Slide,
  Fab,
  Zoom,
  MenuItem,
  Tooltip,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  makeStyles,
  useTheme,
  Link,
  useMediaQuery,
  useScrollTrigger,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import GitHubIcon from '@material-ui/icons/GitHub';
import { ThemeToggle } from '../theme/ThemeToggle';
import {
  AccountBox,
  Description,
  ExitToApp,
  Home,
  ListAlt,
} from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
    color: 'inherit',
  },
  avatar: {
    width: '1.5rem',
    height: '1.5rem',
    fontSize: '1rem',
    backgroundColor: theme.palette.color,
  },
  appBar: {
    backgroundColor: theme.palette.background,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  backToTop: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(2, 2),
    marginTop: 'auto',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
    ...theme.mixins.toolbar,
  },
}));

export const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
};

export const ScrollTop = ({ children }) => {
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role='presentation'
        className={classes.backToTop}
      >
        {children}
      </div>
    </Zoom>
  );
};

export const Header = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { currentUser } = useContext(UserContext);

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: true,
  });

  const [open, setOpen] = useState(isDesktop);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    signOut();
    return <Redirect to='/signin' />;
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const profileOpen = Boolean(anchorEl);

  return (
    <div className={classes.root}>
      <HideOnScroll>
        <AppBar
          position='fixed'
          color='default'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar id='back-to-top-anchor'>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title} noWrap>
              <Link color='inherit' component={NavLink} to='/' underline='none'>
                LeetFolio
              </Link>
            </Typography>
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
                href='https://github.com/JoHoop/leetfolio'
                target='_blank'
                rel='noreferrer'
              >
                <GitHubIcon className={classes.icon} />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          {currentUser && (
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={currentUser.photoURL} alt='Avatar' />
                </ListItemAvatar>
                <ListItemText
                  style={{
                    marginLeft: 7,
                  }}
                  primary={currentUser.displayName}
                  secondary={currentUser.email}
                />
              </ListItem>
            </List>
          )}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            key={'home'}
            component={NavLink}
            to={'/'}
            exact
            activeClassName='Mui-selected'
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
          <ListItem
            button
            key={'editor'}
            component={NavLink}
            to={'/editor'}
            activeClassName='Mui-selected'
          >
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary={'Editor'} />
          </ListItem>
          <ListItem
            button
            key={'resume'}
            component={NavLink}
            to={'/resume'}
            activeClassName='Mui-selected'
          >
            <ListItemIcon>
              <Description />
            </ListItemIcon>
            <ListItemText primary={'Resume'} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {currentUser ? (
            <React.Fragment>
              <ListItem
                component={NavLink}
                to={'/account'}
                button
                key={'account'}
                activeClassName='Mui-selected'
              >
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText primary={'Account'} />
              </ListItem>
              <ListItem
                button
                onClick={handleSignOut}
                key={'signout'}
                activeClassName='Mui-selected'
              >
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary={'Sign out'} />
              </ListItem>
            </React.Fragment>
          ) : (
            <ListItem
              component={NavLink}
              to={'/signin'}
              button
              key={'signin'}
              activeClassName='Mui-selected'
            >
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary={'Sign in'} />
            </ListItem>
          )}
        </List>

        <Typography
          variant='body2'
          color='textSecondary'
          align='center'
          className={classes.footer}
        >
          {'Copyright © '}
          <Link color='inherit' href='https://leetfolio.com'>
            LeetFolio
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
      <ScrollTop>
        <Fab color='default' size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  );
};
