import React from 'react';
import State from '../State';
import GameSearch from '../components/GameSearch';
import Loading from '../components/Loading';
import Menu from '../components/Menu';

var GameSearchPage = React.createClass( {

  render(){
    var state = this.props.store;
    var games = state.games || [];

    if (state.status == 'loading') {
      var loading = <Loading status={state.message}/>;
    }

    if (state.status == 'error') {
      var alert = <div className="alert alert-danger" role="alert"><strong>Error</strong> {state.message}</div>
    }

    return (
      <div>
        <Menu />
        {loading}

        <div className="container">
          {alert}
        </div>
        <GameSearch games={games} />
      </div>
    )
  },
  componentDidMount(){
    // Make the app reactive
    State.trigger('games:fetch');
  }
});

module.exports = GameSearchPage;
