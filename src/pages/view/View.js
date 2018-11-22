import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

import { Status } from '../../config/enumeration';
import Refinement from './components/Refinement';
import Waiting from './components/Waiting';
import Completed from './components/Completed';

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
    const { id } = this.props.match.params;
    const { history } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    } else if (!session) {
      return (
        <div>Refinement Session Id {this.props.match.params.id} not found.</div>
      );
    }

    switch (session.status) {
      case Status.NotStarted:
        return <Waiting id={id} />;
      case Status.Completed:
        return <Completed history={history} />;
      case Status.InProgress:
        return <Refinement id={id} session={session} />;
      default:
        return <div>Invalid Refinement Session</div>;
    }
  }
}
