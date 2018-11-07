import React, { Component } from 'react';
import { Container, Jumbotron, Button } from 'reactstrap';
import IdModal from './components/IdModal';

export default class Home extends Component {
  state = {
    idModal: {
      isOpen: false,
    },
  };

  onViewSharedClick = () => {
    this.setState({
      idModal: {
        ...this.state.idModal,
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

  render() {
    const { history } = this.props;

    return (
      <Container>
        <Jumbotron>
          <h1 className="display-3" style={{ fontFamily: 'SignPainter' }}>
            Refinr Buddy
          </h1>
          <Button className="App-button" color="primary">
            Start a Shared Refinement
          </Button>
          <Button
            className="App-button"
            color="success"
            onClick={this.onViewSharedClick}
          >
            View a Shared Refinement
          </Button>
          <Button className="App-button" color="info">
            Start a Local Refinement
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
