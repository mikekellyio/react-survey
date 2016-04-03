import State from '../State';
import config from '../config';
import $ from 'jquery';
import _ from 'lodash';
import { browserHistory } from 'react-router'

State
    .on('beforeAll', function( eventName, ...args ){
        if(process.env.NODE_ENV == "development"){
          console.log( eventName, args );
        }
    })
    .on('games:fetch', function () {
      State.get().set({status: 'loading', message: "Fetching active games..."});
      $.get(config.api_url + "games")
        .fail(function(){
          State.get().set({status: 'error', message: "Failed to get games."});
        })
        .done(function(data){
          State.get().set({status: 'ready', message: "Fetching active games...",games: data});
        })
    })
    .on('game:fetch', function (gameId, password) {
      State.get().set({status: 'loading', message: "Loading game..."});
      $.get(config.api_url + "games/"+gameId, {password: password})
        .done(function(data){
          data.password = password
          State.trigger('game:update', data)
        })
        .fail(function(){
          State.get().set({status: 'error', message: "Failed to connect to game."});
        })
    })
    .on('game:update', function(game){
      var state = State.get().set({status: 'ready', message: "Fetching game..."});
      var oldGame = _.find(state.games, function(g){return g.id == game.id})
      if(oldGame){
        oldGame.set(game)
      }else{
        state.games.push(game);
      }

    })
    .on('game:search', function (query) {

    })
    .on('game:reset-score', function(game){
      _.each(game.teams, function(team){
        State.trigger('team:set-score', team, 0)
      })
    })
    .on('game:subscribe', (gameId, password) => {
      var state = State.get()
      var game =  _.find(state.games, function(g){return g.id == gameId})
      if(password){
        var interval = setInterval( ()=> {
          State.trigger("game:fetch", gameId, password)
        }, 1000);
        game.set({subscription: interval})
      }
    })
    .on("game:unsubscribe", (gameId) =>{
      var state = State.get()
      var game =  _.find(state.games, function(g){return g.id == gameId})
      clearInterval(game.subscription)
    })
