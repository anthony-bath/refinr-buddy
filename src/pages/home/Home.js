import React, { Component } from 'react';
import { Container, Jumbotron, Button } from 'reactstrap';
import axios from 'axios';

import { endpoint } from '../../config/firebase.config';
import IdModal from './components/IdModal';

export default class Home extends Component {
  state = {
    idModal: {
      isOpen: false,
    },
    loading: false,
  };

  onViewSharedClick = () => {
    this.setState({
      idModal: {
        ...this.state.idModal,
        isOpen: true,
      },
    });
  };

  onCreateClick = () => {
    this.setState({ loading: true }, async () => {
      try {
        const result = await axios.post(endpoint.create, {
          tickets: 10,
          durationMinutes: 60,
        });

        this.props.history.push(`${result.data.id}/view`);
      } catch (ex) {
        console.log(ex);
        this.setState({ loading: false });
      }
    });
  };

  onCloseIdModal = () => {
    this.setState({
      idModal: {
        ...this.state.idModal,
        isOpen: false,
      },
    });
  };

  render() {
    const { history } = this.props;
    const { loading } = this.state;

    return (
      <Container>
        <Jumbotron>
          <h1 className="display-3" style={{ fontFamily: 'SignPainter' }}>
            Refinr Buddy
          </h1>
          <Button
            className={'App-button'}
            color={'primary'}
            disabled={loading}
            onClick={this.onCreateClick}
          >
            Create a Shared Refinement
          </Button>
          <Button
            className="App-button"
            color="success"
            onClick={this.onViewSharedClick}
          >
            View a Shared Refinement
          </Button>
        </Jumbotron>
        <IdModal
          isOpen={this.state.idModal.isOpen}
          history={history}
          onClose={this.onCloseIdModal}
        />
      </Container>
    );
  }
}
