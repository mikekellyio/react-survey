import React from 'react';
import State from '../State';
import {Link } from 'react-router';
import { FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

var Question = React.createClass( {
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
  handleChange(e){
    if(e.target.value != ""){
      State.trigger("value:update", this.props.question, e.target.value)
    }
  },

  render(){
    if(this.props.type == "select"){
      var options = _.map(_.flatten(["", this.props.options]), (value) => {
        return <option key={value} value={value}>{value}</option>
      })
    }
    return (
      <form>
        <FormGroup
          controlId={this.props.id}
        >
          <ControlLabel>{this.props.label}</ControlLabel>
          <FormControl
            type={this.props.type}
            value={this.props.value}
            onChange={this.handleChange}
            componentClass={this.props.type}
          >
          {options}
          </FormControl>
          <FormControl.Feedback />
        </FormGroup>
      </form>
    )
  }
});

module.exports = Question;
