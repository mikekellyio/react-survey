import React from 'react';

export default class Loading extends React.Component {
  render(){
    return (
      <section className="hero is-fullheight is-info is-bold">
        <div className="hero-content">
          <div className="container">
            <h1 className="title">
              Loading
            </h1>
            <h2 className="subtitle">
              {this.props.status}
            </h2>
          </div>
        </div>
      </section>
    )
  }
}
