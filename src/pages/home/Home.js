import React, { Component } from 'react';
import { Container, Jumbotron, Button } from 'reactstrap';

import IdModal from './components/IdModal';
import CreateModal from './components/CreateModal';

export default class Home extends Component {
  state = {
    idModal: {
      isOpen: false,
    },
    createModal: {
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
    this.setState({
      createModal: {
        ...this.state.createModal,
        isOpen: true,
      },
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

  onCloseCreateModal = () => {
    this.setState({
      createModal: {
        ...this.state.createModal,
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
            disabled={loading}
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
        <CreateModal
          isOpen={this.state.createModal.isOpen}
          history={history}
          onClose={this.onCloseCreateModal}
        />
      </Container>
    );
  }
}
