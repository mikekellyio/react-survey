import 'bootstrap-loader';

import React from 'react';
import ReactDOM from 'react-dom';

import AppContainer from './components/AppContainer';
import GameSearchPage from './pages/GameSearchPage';
import GamePage from './pages/GamePage';
import { Router, Route, Link, browserHistory, Redirect } from 'react-router'

import State from './State';

import './reactions/GameReactions';
import './reactions/TeamReactions';

var rootInstance = ReactDOM.render(<AppContainer />, document.getElementById('app'));
