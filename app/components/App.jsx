import React from 'react';
import State from '../State';
import Loading from './Loading';

export default class App extends React.Component {
  render(){
    return (
      <div>
        <header className="header">
          <div className="container">
            <div className="header-left">
              <a className="header-item" href="#">
                Gametime
              </a>
            </div>

            <span className="header-toggle">
              <span></span>
              <span></span>
              <span></span>
            </span>

            <div className="header-right header-menu">
              <span className="header-item">
                <a href="#">Nav item</a>
              </span>
              <span className="header-item">
                <a href="#">Other nav item</a>
              </span>
            </div>
          </div>
        </header>

        
      </div>
    )
  }
}
