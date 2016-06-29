import React from 'react';
import State from '../State';
import App from './App';
import SurveyPage from '../pages/SurveyPage';
import SurveyStepPage from '../pages/SurveyStepPage';
import ThankYouPage from '../pages/ThankYouPage';
import ErrorPage from '../pages/ErrorPage';
import { Router, Route, Link, browserHistory, Redirect } from 'react-router'

export default class AppContainer extends React.Component {
  render(){
    return (
      <Router history={browserHistory}>
        <Route path="/" component={SurveyPage}>
          <Route path="step/:pageId" component={SurveyStepPage} />
        </Route>
        <Route path="/thankyou" component={ThankYouPage} />
        <Route path="/error" component={ErrorPage} />

        <Redirect from="/step" to="/" />
      </Router>
    )
  }
};
