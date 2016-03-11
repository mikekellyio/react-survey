import React from 'react';
import State from '../State';
import Loading from '../components/Loading';
import Game from '../components/Game';
import _ from 'lodash';

var GamePage = React.createClass({
  getInitialState(){
    return {game: null};
  },

  render(){
    var game = this.state.game;

    if(game){
      return <Game game={game} />
    }else{
      return <div />;
    }
  },

  findGameById(state, gameId){
    return _.find(state.games, function(g){return g.id == gameId})
  },

  componentDidMount(){
    // Make the app reactive
    console.log("GamePage mounted", this.props.store)
    var me = this;
    State.on('update', this.update );
    State.trigger('game:fetch', {id: this.props.params.gameId}, this.props.params.password)
  },
  componentWillUnmount(){
    State.off('update', this.update );
  },
  update(){
    console.log("updating "+this.props.params.gameId, this.props.store)
    this.setState({game: this.findGameById(State.get(), this.props.params.gameId)})
  }
});

module.exports = GamePage;
