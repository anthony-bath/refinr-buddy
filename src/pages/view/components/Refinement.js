import React, { Component } from 'react';
import moment from 'moment';

export default class Refinement extends Component {
  state = {
    remaining: 0,
  };

  timer = null;

  componentDidMount() {
    this.initializeTimer();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.session.tickets !== this.props.session.tickets) {
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

  render() {
    return <div>{this.state.remaining}</div>;
  }
}
