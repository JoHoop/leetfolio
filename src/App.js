import React, { Suspense, lazy } from 'react';
import { CssBaseline, Container, Box, makeStyles } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Loading, LoadingError } from './components/Loading';
import { UserProvider } from './services/UserProvider';
import { ThemeProvider } from './theme/ThemeProvider';
import { ResumeProvider } from './components/Resume/ResumeProvider';
import { PrivateRoute } from './components/PrivateRoute.js';
import { Header } from './components/Header';

const Home = lazy(() =>
  import('./pages/Home').then((module) => ({ default: module.Home }))
);
const Editor = lazy(() =>
  import('./pages/Editor').then((module) => ({ default: module.Editor }))
);
const Resume = lazy(() =>
  import('./pages/Resume').then((module) => ({ default: module.Resume }))
);
const SignIn = lazy(() =>
  import('./pages/SignIn').then((module) => ({ default: module.SignIn }))
);
const SignUp = lazy(() =>
  import('./pages/SignUp').then((module) => ({ default: module.SignUp }))
);
const Reset = lazy(() =>
  import('./pages/Reset').then((module) => ({ default: module.Reset }))
);
const Account = lazy(() =>
  import('./pages/Account').then((module) => ({ default: module.Account }))
);
const PageNotFound = lazy(() =>
  import('./pages/PageNotFound').then((module) => ({
    default: module.PageNotFound,
  }))
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    //backgroundColor: '#329cb9',
    //backgroundImage: 'linear-gradient(135deg, #329cb9, #248daa)',
  },
  content: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));

export const App = () => {
  const classes = useStyles();

  return (
    <UserProvider>
      <ThemeProvider>
        <ResumeProvider>
          <CssBaseline />
          <Router>
            <Box className={classes.root}>
              <Header>
                <Container
                  maxWidth='md'
                  component='main'
                  className={classes.content}
                >
                  <ErrorBoundary fallback={<LoadingError />}>
                    <Suspense fallback={<Loading />}>
                      <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/editor' component={Editor} />
                        <Route path='/resume' component={Resume} />
                        <Route path='/signin' component={SignIn} />
                        <Route path='/signup' component={SignUp} />
                        <Route path='/reset' component={Reset} />
                        <PrivateRoute path='/account' component={Account} />
                        <Route path='*' component={PageNotFound} />
                      </Switch>
                    </Suspense>
                  </ErrorBoundary>
                </Container>
              </Header>
            </Box>
          </Router>
        </ResumeProvider>
      </ThemeProvider>
    </UserProvider>
  );
};
