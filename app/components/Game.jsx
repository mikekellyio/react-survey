import React from 'react';
import State from '../State';
import Loading from './Loading';

export default class Game extends React.Component {
  render(){
    return (
      <div className="is-fullheight">
        <div className="columns is-multiline is-gapless is-halfheight">
          <div className="column is-half">
            First column
          </div>
          <div className="column is-half">
            Second column
          </div>
          <div className="column is-half">
            Third column
          </div>
          <div className="column is-half">
            Fourth column
          </div>
        </div>
      </div>
    )
  }
}
