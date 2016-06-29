import React from 'react';
import State from '../State';
import SurveyStep from './SurveyStep';
import {Link, browserHistory } from 'react-router';
import { Nav, Tab, NavItem, Pager, PageItem } from 'react-bootstrap';

var Survey = React.createClass( {
  next(){
    State.trigger('step:next', this.props.pageNum)
  },

  previous(){
    State.trigger('step:previous', this.props.pageNum)
  },
  submit(){
    State.trigger('survey:submit')
  },
  noOp(){

  },

  render(){
    var state = State.get()
    var pills = _.map(state.pages, (page, index) => {
      if(index>0){
        var lastPage = state.pages[index-1];
      }else{
        var lastPage = page;
      }

      return (
        <NavItem key={"pill"+index} eventKey={"step"+index} disabled={index != 0 && !_.every(lastPage.questions, "value")}>
          {page.header}
        </NavItem>
      )
    })
    var content = _.map(state.pages, (page, index) => {
      return (
        <Tab.Pane key={"page"+index} eventKey={"step"+index}>
          <SurveyStep step={page}/>
        </Tab.Pane>
      );
    })

    if(this.props.pageNum != 0){
      var previous = <PageItem href="#" onClick={this.previous} disabled={this.props.pageNum == 0}>Previous</PageItem>
    }
    if(this.props.survey && this.props.survey.pages && _.every(this.props.survey.pages[parseInt(this.props.pageNum)].questions, "value" ) && this.props.pageNum != (this.props.survey.pages.length-1)){
      var next = <PageItem href="#" onClick={this.next}>Next</PageItem>
    }
    if(this.props.survey && this.props.survey.pages && _.every(this.props.survey.pages[parseInt(this.props.pageNum)].questions, "value" ) && this.props.pageNum == (this.props.survey.pages.length-1)){
      var next = <PageItem href="#" onClick={this.submit}>Submit</PageItem>
    }
    return (
      <div className="survey-component container">
        <Tab.Container id="survey-component__navigation" activeKey={"step"+this.props.pageNum} onSelect={this.noOp}>
          <div>
            <Tab.Content animation>
              {content}
            </Tab.Content>
          </div>
        </Tab.Container>
        <Pager>
          {previous}
          {' '}
          {next}
        </Pager>
      </div>
    )
  }
});

module.exports = Survey;
