import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Loading, LoadingError } from './components/Loading';
import { App } from './App';
import './index.css';

ReactDOM.render(
  <ErrorBoundary fallback={<LoadingError />}>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </ErrorBoundary>,
  document.getElementById('root')
);
