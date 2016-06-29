import React from 'react';
import State from '../State';
import Survey from '../components/Survey';
import _ from 'lodash';
import config from '../config';


var ErrorPage = React.createClass({

  render(){
    return <div><h1 className="text-center">Uh oh!</h1></div>
  }

});

module.exports = ErrorPage;
