import React, { Suspense, lazy } from 'react';
import { CssBaseline, Container, Box, makeStyles } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Loading, LoadingError } from './components/Loading';
import { ThemeProvider } from './theme/ThemeProvider';
import { ResumeProvider } from './components/Resume/ResumeProvider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const Home = lazy(() =>
  import('./pages/Home').then((module) => ({ default: module.Home }))
);
const Editor = lazy(() =>
  import('./pages/Editor').then((module) => ({ default: module.Editor }))
);
const Resume = lazy(() =>
  import('./pages/Resume').then((module) => ({ default: module.Resume }))
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
  },
  content: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));

export const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider>
      <ResumeProvider>
        <CssBaseline />
        <Router>
          <Box className={classes.root}>
            <Header />
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

                    <Route path='*' component={PageNotFound} />
                  </Switch>
                </Suspense>
              </ErrorBoundary>
            </Container>
            <Footer />
          </Box>
        </Router>
      </ResumeProvider>
    </ThemeProvider>
  );
};
