import React from 'react';
import State from '../State';
import App from './App';
import GameSearchPage from '../pages/GameSearchPage';
import GamePage from '../pages/GamePage';
import { Router, Route, Link, browserHistory, Redirect } from 'react-router'

export default class AppContainer extends React.Component {
  render(){
    return (
      <Router history={browserHistory}>
        <Route component={App}>
          <Route path="/" component={GameSearchPage} />
          <Route path="/games/:gameId/:password" component={GamePage} />
          <Redirect from="/games/:gameId" to="/" />
        </Route>
      </Router>
    )
  }
};
