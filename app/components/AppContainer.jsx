import React from 'react';
import State from '../State';
import Loading from './Loading';
import App from './App';

export default class AppContainer extends React.Component {
    render(){
      var state = State.get();

      if (state.status == 'loading') {
        return <Loading status={state.message}/>;
      }

      return <App state={ state } />;
    }

    componentDidMount(){
      var me = this;

      // Make the app reactive
      State.on('update', function () {
          me.forceUpdate();
      });
    }
};
