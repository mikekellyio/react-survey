import React from 'react';
import State from '../State';
import {Link } from 'react-router';
import Question from './Question';

var SurveyStep = React.createClass( {
  /*
  {
    "header": "Goal",
    "questions": [
      {
        "id": "00N50000001Kiq5",
        "text": "Select your goal",
        "type": "select",
        "options": [
          "Refinance",
          "Purchase"
        ]
      }
    ]
  }
  */
  render(){
    var step = this.props.step;
    var header = step && step.header ? step.header : "Loading..."

    if(step){
      var questions = _.map(step.questions, (question) => {
        return (
          <Question key={question.id}
            label={question.text}
            type={question.type}
            id={question.id}
            value={question.value}
            question={question}
            options={question.options} />
        )
      })
    }

    return (
      <div className="survey-step-component">
        <legend>{header}</legend>
        {questions}
      </div>
    )
  }
});

module.exports = SurveyStep;
