import React, { Component } from 'react';
import moment from 'moment';
import { Button, Container } from 'reactstrap';
import axios from 'axios';

import { endpoint } from '../../../config/firebase.config';

export default class Refinement extends Component {
  state = {
    remaining: 0,
  };

  timer = null;

  componentDidMount() {
    this.initializeTimer();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.session !== this.props.session) {
      if (this.timer) {
        clearInterval(this.timer);
      }

      this.initializeTimer();
    }
  }

  initializeTimer = () => {
    const { estimatedEndDate } = this.props.session.currentTicket;
    const remaining = moment
      .duration(moment(estimatedEndDate).diff(moment()))
      .asSeconds();

    this.setState({ remaining });
    this.timer = setInterval(this.updateTimer, 1000);
  };

  updateTimer = () => {
    this.setState(prevState => ({ remaining: prevState.remaining - 1 }));
  };

  onNextClick = () => {
    const { id } = this.props;
    axios.post(endpoint.next, { id });
  };

  render() {
    return (
      <Container>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span>{this.state.remaining}</span>
          <Button color={'primary'} onClick={this.onNextClick}>
            Next Ticket
          </Button>
        </div>
      </Container>
    );
  }
}
