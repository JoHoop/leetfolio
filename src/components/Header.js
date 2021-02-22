import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
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
  Slide,
  useScrollTrigger,
  Fab,
  Zoom,
  MenuItem,
  Tooltip,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircle from '@material-ui/icons/AccountCircle';
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
    // necessary for content to be below app bar
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
}));

export const HideOnScroll = (props) => {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
};

export const ScrollTop = (props) => {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
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
      <div onClick={handleClick} role='presentation' className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
};

export const Header = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: true,
  });

  console.log(isDesktop);

  const [open, setOpen] = React.useState(isDesktop);

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

  const loggedIn = true;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const profileOpen = Boolean(anchorEl);

  return (
    <div className={classes.root}>
      <HideOnScroll>
        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
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
              LeetFolio
            </Typography>
            {loggedIn ? (
              <Box>
                <Tooltip
                  title={'Account'}
                  placement='bottom'
                  TransitionComponent={Zoom}
                >
                  <IconButton
                    aria-label='account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    onClick={handleMenu}
                    color='inherit'
                  >
                    <AccountCircle />
                  </IconButton>
                </Tooltip>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={profileOpen}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Settings</MenuItem>
                  <MenuItem onClick={handleClose}>Sign out</MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button color='inherit'>Login</Button>
            )}
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
          <ListItem button key={'home'} component={NavLink} to='/'>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
          <ListItem button key={'editor'} component={NavLink} to='/editor'>
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary={'Editor'} />
          </ListItem>
          <ListItem button key={'resume'} component={NavLink} to='/resume'>
            <ListItemIcon>
              <Description />
            </ListItemIcon>
            <ListItemText primary={'Resume'} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key={'account'}>
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary={'Account'} />
          </ListItem>
          <ListItem button key={'signout'}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary={'Sign out'} />
          </ListItem>
        </List>
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
        <Fab color='secondary' size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  );
};
