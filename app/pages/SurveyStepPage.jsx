import React from 'react';
import State from '../State';
import SurveyStep from '../components/SurveyStep';
import _ from 'lodash';
import config from '../config';


var SurveyPagePage = React.createClass({
  getInitialState(){
    return {survey: {}};
  },

  render(){
    console.log("rendering SurveyStep")
    var step = this.getStep();

    if(step){
      return <SurveyStep step={step}/>
    }else{
      return <div />;
    }
  },

  findStepById(state, pageId){
    var step = state.pages[pageId];
    return step;
  },

  componentDidMount(){
    // Make the app reactive
    State.on('update', this.update );
  },

  componentWillUnmount(){
    State.off('update', this.update );
  },

  update(){
    this.setState({step: this.getStep()})
  },

  getStep(){
    return this.findStepById(State.get(), this.props.params.pageId);
  }

});

module.exports = SurveyPagePage;
