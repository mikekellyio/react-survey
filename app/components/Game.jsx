import React from 'react';
import State from '../State';
import Team from './Team'
import {Link, browserHistory } from 'react-router'
import Menu from './Menu'

var Game = React.createClass( {
  render(){
    var game = this.props.game;

    return (
      <div className="game__wrapper flexChild">
        <header className="flexChild">
          <Menu />
        </header>
        <div className="game__container flexChild">
          <div className="game__row flexChild">
            <Team team={game.teams[0]} />
            <Team team={game.teams[1]} />
          </div>
          <div className="game__row flexChild">
            <Team team={game.teams[2]} />
            <Team team={game.teams[3]} />
          </div>
        </div>
        <footer className="flexChild">
          <nav classNameName="navbar">
            <div className="container">
              <div classNameName="navbar-header">
                <span className="navbar-brand">{game.name}:{game.password}</span>
              </div>
              <button type="button" onClick={this.resetScore} className="btn btn-xs navbar-btn btn-primary navbar-right">New Game</button>
            </div>
          </nav>
        </footer>
      </div>
    )
  },

  resetScore(){
    State.trigger('game:reset-score', this.props.game)
  }
});

module.exports = Game;
