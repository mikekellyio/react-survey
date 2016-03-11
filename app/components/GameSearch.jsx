import React from 'react';
import State from '../State';
import Autocomplete from 'react-autocomplete'
import { browserHistory } from 'react-router'

let styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  }
}

var GameSearch = React.createClass({

  getInitialState(){
    return {password: ""}
  },
  connect(event){
    event.preventDefault()
    browserHistory.push('/games/'+this.state.game.id+'/'+this.state.password)
  },
  setPassword(event){
    this.setState({password: event.target.value})
  },
  enableConnect(){
    return !!this.state && !!this.state.game && !!this.state.password;
  },
  render(){
    return (
      <div className="container">
        <form className="form-signin">
          <h2 className="form-signin-heading">Please select Game</h2>
          <label htmlFor="inputGame" className="sr-only">Game Location</label>
          <Autocomplete
            ref="autocomplete"
            inputProps={ {className: "form-control game-location", placeholder: "Search for Game Location"} }
            items={this.props.games}
            getItemValue={(item) => item.name}
            onSelect={(value, item) => {
              // set the menu to only the selected item
              var game = _.find(this.props.games, function(g){return g.id == item.id}) || {}
              this.setState({ game: item, password: game.password })
              // or you could reset it to a default list again
              // this.setState({ unitedStates: getStates() })
            }}
            onChange={(event, value) => {
              State.trigger("game:search", value)
            }}
            renderItem={(item, isHighlighted) => (
              <div
                style={isHighlighted ? styles.highlightedItem : styles.item}
                key={item.id}
                id={item.name}
              >{item.name}</div>
            )}
          />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" value={this.state.password} onChange={this.setPassword} required />

          <button className="btn btn-lg btn-primary btn-block" disabled={!this.enableConnect()} onClick={this.connect}>Connect</button>
        </form>

      </div>
    )
  }
});
module.exports = GameSearch;
