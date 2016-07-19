import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
// import { createHistory } from 'history';
import { render } from 'react-dom';

import Main from './react/Main'

render((
  <Router history={hashHistory}>
    <Route path='/' component={Main} />
  </Router>
), document.getElementById('app'));
