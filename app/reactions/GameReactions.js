import State from '../State';
import config from '../config';
import $ from 'jquery';
import _ from 'lodash';
import { browserHistory } from 'react-router'

State
    .on('games:fetch', function () {
      console.log('games:fetch')
      State.get().set({status: 'loading', message: "Fetching active games..."});
      $.get(config.api_url + "games")
        .done(function(data){
          State.get().set({status: 'ready', message: "Fetching active games...",games: data});
        })
    })
    .on('game:fetch', function (game, password) {
      console.log('game:fetch', game, password)
      State.get().set({status: 'loading', message: "Loading game..."});
      $.get(config.api_url + "games/"+game.id, {password: password})
        .done(function(data){
          data.password = password
          State.trigger('game:update', data)
        })
        .fail(function(){
          State.get().set({status: 'error', message: "Failed to connect to game."});
        })
    })
    .on('game:update', function(game){
      console.log('game:update', game)
      var state = State.get().set({status: 'ready', message: "Fetching active games..."});
      var oldGame = _.find(state.games, function(g){return g.id == game.id})
      if(oldGame){
        oldGame.set(game)
      }else{
        state.games.push(game);
      }

    })
    .on('game:search', function (query) {
      console.log('game:search', query)
    })
    .on('game:reset-score', function(game){
      console.log('game:reset-score', game)
      _.each(game.teams, function(team){
        State.trigger('team:set-score', team, 0)
      })
    })
