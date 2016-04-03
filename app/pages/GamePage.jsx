import React from 'react';
import State from '../State';
import Loading from '../components/Loading';
import Game from '../components/Game';
import _ from 'lodash';
import config from '../config';


var GamePage = React.createClass({
  getInitialState(){
    return {game: null};
  },

  render(){
    var game = this.state.game;

    if(game){
      return <Game game={game} cable={this.state.cable}/>
    }else{
      return <div />;
    }
  },

  findGameById(state, gameId){
    return _.find(state.games, function(g){return g.id == gameId})
  },

  componentDidMount(){
    // Make the app reactive
    State.on('update', this.update );
    State.trigger('game:fetch', this.props.params.gameId, this.props.params.password)

    State.trigger('game:subscribe', this.props.params.gameId, this.props.params.password)

  },
  
  componentWillUnmount(){
    State.off('update', this.update );
    State.trigger('game:unsubscribe', this.props.params.gameId)
  },

  update(){
    this.setState({game: this.findGameById(State.get(), this.props.params.gameId)})
  }
});

module.exports = GamePage;
