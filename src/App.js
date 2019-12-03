import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import Auth from './containers/Auth';
import User from './containers/User';

import Header from './components/header';

import { Firebase } from './helpers';

Firebase.initialize();

const App = () => (
  <>
    <Header />
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path={['/auth', '/auth/:status']} component={Auth} />
        <Route path="/user/:userId" component={User} />
        <Route path="*" component={() => <p>no match</p>} />
      </Switch>
    </Router>
  </>
);

export default App;
