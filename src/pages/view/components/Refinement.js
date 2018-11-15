import React, { Component } from 'react';

export default class Refinement extends Component {
  state = {
    time: 0,
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
    this.setState({ time: this.props.session.timeForCurrentTicket });
    this.timer = setInterval(this.updateTimer, 1000);
  };

  updateTimer = () => {
    this.setState(prevState => ({ time: prevState.time - 1 }));
  };

  render() {
    return <div>{this.state.time}</div>;
  }
}
