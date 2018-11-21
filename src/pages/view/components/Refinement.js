import React, { Component } from 'react';
import moment from 'moment';
import { Button, Container, Row, Col } from 'reactstrap';
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

  onEndClick = () => {
    const { id } = this.props;
    axios.post(endpoint.end, { id });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <span>{this.state.remaining}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button color={'primary'} onClick={this.onNextClick}>
              Next Ticket
            </Button>
          </Col>
          <Col>
            <Button color={'danger'} onClick={this.onEndClick}>
              End Refinement
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
