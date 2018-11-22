import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import { endpoint } from '../../../config/firebase.config';

export default class Waiting extends Component {
  start = () => {
    const { id } = this.props;

    axios.post(endpoint.start, { id });
  };

  render() {
    return (
      <div>
        Refinment not yet started <br />
        <Button color={'primary'} onClick={this.start}>
          Start Refinement
        </Button>
      </div>
    );
  }
}
