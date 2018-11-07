import React, { Component } from 'react';

export default class View extends Component {
  render() {
    return (
      <div>
        <h1>View Refinement</h1>
        <button onClick={() => this.props.history.push('/')}>Back</button>
      </div>
    );
  }
}
