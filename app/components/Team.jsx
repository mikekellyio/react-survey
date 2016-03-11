import React from 'react';
import State from '../State';
import _ from 'lodash';

module.exports = React.createClass({
  render(){
    var team = this.props.team;

    return (
      <div className={"team flexChild " + _.lowerCase(team.name)}>
        <h3>{team.score}</h3>
        <p>{team.name}</p>
        <div className="increment" onClick={this.increment}></div>
        <div className="decrement" onClick={this.decrement}></div>
      </div>
    )
  },

  increment(){
    State.trigger("team:increment", this.props.team)
  },

  decrement(){
    State.trigger("team:decrement", this.props.team)
  }
});
