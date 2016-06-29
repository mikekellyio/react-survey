//import 'bootstrap-loader';

import React from 'react';
import ReactDOM from 'react-dom';

import AppContainer from './components/AppContainer';
import { Router, Route, Link, browserHistory, Redirect } from 'react-router'

import State from './State';

import './reactions/SurveyReactions';

var rootInstance = ReactDOM.render(<AppContainer />, document.getElementById('survey'));
