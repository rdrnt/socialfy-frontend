import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-poppins';
import '@reach/dialog/styles.css';
import './index.css';

import App from './App';

import { Environment, Analytics, Firebase } from './helpers';

if (Environment.isDevelopment) {
  console.warn('SOCIALFY - RUNNING IN DEVELOPMENT MODE');
} else {
  Analytics.initialize();
}

Firebase.initialize();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
