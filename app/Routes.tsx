/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';

// Lazily load routes and code split with webpacck
const LazyCounterPage = React.lazy(() =>
  import(/* webpackChunkName: "CounterPage" */ './containers/CounterPage')
);

const LazyDataExplorerPage = React.lazy(() =>
  import(
    /* webpackChunkName: "DataExplorerPage" */ './containers/DataExplorerPage'
  )
);

const CounterPage = (props: Record<string, unknown>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyCounterPage {...props} />
  </React.Suspense>
);

const DataExplorerPage = (props: Record<string, unknown>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyDataExplorerPage {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.DATA_EXPLORER} component={DataExplorerPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
