import './styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/AppContainer';

import State from './State';

import './reactions/GameReactions';
State.trigger('games:fetch');

var rootInstance = ReactDOM.render(<AppContainer />, document.getElementById('app'));
