import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import { createBrowserHistory } from 'history';

export let history = CLIENT ? createBrowserHistory() : {};

export const ClientRoutes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact={true} path="/ssrBase">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};
