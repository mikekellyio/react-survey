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
    .on('value:update', (obj, value) => {
      obj.set({value: value});
    })
    .on('step:change',  (id) => {
      browserHistory.push('/step/'+id)
    })
    .on('step:next', (currentStepId) => {
      var nextStepId = parseInt(currentStepId)+1;
      var pages = _.slice(State.get().pages, nextStepId, State.get().pages.length);
      var offset = _.findIndex(pages, (p) => {return validStep(p)})
      State.trigger("step:change", (nextStepId >= 0 ? nextStepId+offset : currentStepId))
    })
    .on('step:previous', (currentStepId) => {
      var pages = _.slice(State.get().pages, 0, currentStepId);
      var newStepId = _.findLastIndex(pages, (p) => {return validStep(p)})
      State.trigger("step:change", (newStepId >= 0 ? newStepId : currentStepId))
    })
    .on('survey:fetch', () => {
      var configPath = $('#survey').data('config');
      $.get(configPath, (data) => {
        State.get().reset(data);
      })
    })
    .on('survey:submit', () => {
      var data = submissionValues()
      $.post({url: State.get().action, data: data, dataType: "html", crossDomain: true})
       .always(()=>{
         browserHistory.push('/thankyou')
       });
    })

var validStep = function(step){
  if(step.condition){
    var questions = _.flatMap(State.get().pages, (p) => {return p.questions})
    return !!_.find(questions, step.condition)
  }else{
    return true;
  }
}

var submissionValues = function(){
  var questions = _.flatMap(State.get().pages, (p) => {return p.questions})
  var values = {};
  _.each(questions, (q) => {
    values[q.id] = q.value;
  })

  return _.merge(values, State.get().hidden);
}
