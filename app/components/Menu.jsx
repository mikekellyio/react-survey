import React from 'react';
import State from '../State';
import {Link, browserHistory } from 'react-router'

module.exports = React.createClass({
  render(){
    var team = this.props.team;

    return (
      <div className="container">
        <nav classNameName="navbar navbar-inverse navbar-fixed-top">
          <div classNameName="container">
            <div classNameName="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="/">Gametime</Link>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
});
