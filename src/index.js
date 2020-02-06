import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-poppins';
import '@reach/dialog/styles.css';

import App from './App';

import { Environment } from './helpers';

if (Environment.isDevelopment) {
  console.warn('SOCIALFY - RUNNING IN DEVELOPMENT MODE');
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
