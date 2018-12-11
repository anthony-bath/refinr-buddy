import React, { Component } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { Button, Container, Row, Col } from 'reactstrap';
import axios from 'axios';

import { endpoint } from '../../../config/firebase.config';

momentDurationFormatSetup(moment);

export default class Refinement extends Component {
  state = {
    remaining: 0,
    loading: false,
  };

  timer = null;

  componentDidMount() {
    this.initializeTimer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.session !== this.props.session) {
      if (this.timer) {
        clearInterval(this.timer);
      }

      this.initializeTimer();
    }

    if (!prevState.loading && this.state.loading) {
      document.body.className = 'App-loading';
    } else if (!this.state.loading && prevState.loading) {
      document.body.className = '';
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  initializeTimer = () => {
    const { estimatedEndDate } = this.props.session.currentTicket;
    const remaining = moment
      .duration(moment(estimatedEndDate).diff(moment()))
      .asSeconds();

    this.setState({ remaining, loading: false });
    this.timer = setInterval(this.updateTimer, 1000);
  };

  updateTimer = () => {
    this.setState(prevState => ({ remaining: prevState.remaining - 1 }));
  };

  onNextClick = () => {
    const { id } = this.props;

    this.setState({ loading: true }, () => axios.post(endpoint.next, { id }));
  };

  onEndClick = () => {
    const { id } = this.props;
    axios.post(endpoint.end, { id });
  };

  render() {
    const { remaining, loading } = this.state;
    const { isLastTicket } = this.props.session.currentTicket;
    const btnClassName = loading ? 'App-btn--loading' : '';

    return (
      <Container>
        <Row>
          <Col style={{ textAlign: 'center' }}>
            <h1>
              {loading ? (
                <span>Loading...</span>
              ) : (
                <span>
                  {moment
                    .duration(remaining, 's')
                    .format('mm:ss', { trim: false })}
                </span>
              )}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: 'center' }}>
            <Button
              className={btnClassName}
              color={'danger'}
              disabled={loading}
              onClick={this.onEndClick}
            >
              End Refinement
            </Button>
          </Col>
          {!isLastTicket && (
            <Col style={{ textAlign: 'center' }}>
              <Button
                className={btnClassName}
                color={'primary'}
                onClick={this.onNextClick}
                disabled={loading}
              >
                Next Ticket
              </Button>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}
