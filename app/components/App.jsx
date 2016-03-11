import React from 'react';
import State from '../State';
import Loading from './Loading';
import {Link, browserHistory } from 'react-router';
import Menu from './Menu';

var App = React.createClass( {
  componentDidMount(){
    var me = this;

    // Make the app reactive
    State.on('update', (state) => {me.forceUpdate()});
  },

  render(){
    return (
      <div className="app-component">
        {React.cloneElement(this.props.children, {store: State.get()})}
      </div>
    )
  }
});

module.exports = App;
