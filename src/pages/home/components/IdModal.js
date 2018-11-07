import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from 'reactstrap';
import PropTypes from 'prop-types';

export default class IdModal extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  state = {
    id: '',
  };

  onChangeId = ({ target: { value } }) =>
    this.setState({ id: value.replace(/[^\d]/g, '') });

  onViewClick = () => {
    this.props.history.replace(`${this.state.id}/view`);
  };

  render() {
    const { isOpen, onClose } = this.props;

    return (
      <Modal isOpen={isOpen}>
        <ModalHeader>Refinement Id</ModalHeader>
        <ModalBody>
          <Input
            type={'text'}
            value={this.state.id}
            onChange={this.onChangeId}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={this.onViewClick}
            disabled={!this.state.id}
          >
            View
          </Button>{' '}
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
