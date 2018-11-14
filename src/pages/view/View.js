import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

import { Status } from '../../config/enumeration';

export default class View extends Component {
  state = {
    loading: true,
    session: null,
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    firebase
      .database()
      .ref(`refinement/${id}`)
      .on('value', this.refinementUpdated);
  }

  componentWillUnmount() {
    const { id } = this.props.match.params;

    firebase
      .database()
      .ref(`refinement/${id}`)
      .off('value', this.refinementUpdated);
  }

  refinementUpdated = snapshot => {
    const session = snapshot.val();

    this.setState({
      session,
      loading: false,
    });
  };

  render() {
    const { loading, session } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    } else if (!session) {
      return (
        <div>Refinement Session Id {this.props.match.params.id} not found.</div>
      );
    }

    switch (session.status) {
      case Status.NotStarted:
        return <div>Refinment not yet started!</div>;
      case Status.Completed:
        return <div>The Refinement Session has been completed.</div>;
      case Status.InProgress:
        return <div>Refinement in progress</div>;
      default:
        return <div>Invalid Refinement Session</div>;
    }
  }
}
