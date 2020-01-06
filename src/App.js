import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import Auth from './containers/Auth';
import User from './containers/User';
import Search from './containers/Search';

import Header from './components/header';

import { UIContextProvider } from './contexts';

import { Firebase } from './helpers';
import config from './config';

Firebase.initialize();

const App = () => (
  <Router>
    <UIContextProvider>
      <Header />
      <Switch>
        <Route exact path={config.routes.HOME} component={Home} />
        <Route path={config.routes.AUTH} component={Auth} />
        <Route path={config.routes.SEARCH} component={Search} />
        <Route path="/:userId" component={User} />
        <Route path="*" component={() => <p>no match</p>} />
      </Switch>
    </UIContextProvider>
  </Router>
);

export default App;
