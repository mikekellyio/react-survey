import React from 'react';
import State from '../State';
import Survey from '../components/Survey';
import _ from 'lodash';
import config from '../config';


var SurveyPage = React.createClass({
  getInitialState(){
    return {survey: {}};
  },

  render(){
    var survey = this.state.survey;
    var pageNum = this.props.params && this.props.params.pageId ? this.props.params.pageId : 0

    if(survey){
      return <Survey survey={survey} children={this.props.children} pageNum={pageNum}/>
    }else{
      return <div />;
    }
  },

  componentDidMount(){
    // Make the app reactive
    State.on('update', this.update );
    State.trigger('survey:fetch')
  },

  componentWillUnmount(){
    State.off('update', this.update );
  },

  update(updated){
    this.setState({survey: updated})
  }
});

module.exports = SurveyPage;
