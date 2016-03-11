import State from '../State';
import config from '../config';
import $ from 'jquery';
import _ from 'lodash';
import { browserHistory } from 'react-router'

State
    .on('team:increment', function(team){
      State.trigger('team:set-score', team, team.score + 1)
    })
    .on('team:decrement', function(team){
      var updatedScore = team.score > 0 ? team.score -1 : 0;
      State.trigger('team:set-score', team, updatedScore)
    })
    .on('team:set-score', function(team, score){
      $.ajax(config.api_url + "teams/"+team.id, {data: {team: {score: score}}, method: 'PUT'})
        .done(function(data){
          State.trigger('team:update', data)
        })
        .fail(function(){
          State.get().set({status: 'error', message: "Failed to update team."});
        })
    })
    .on('team:update', function(data){
      console.log('team:update', data)
      var game = _.find(State.get().games, function(game){
        return game.id == data.game.id
      })
      if(game){

        var team = _.find(game.teams, function(team){
          return team.id == data.id
        })
        if(team){
          console.log(team)
          team.set(data)
        }else{
          game.teams.push(data)
        }
      }else{
        State.get().set({status: 'error', message: "Failed to update team."});
      }
    })
