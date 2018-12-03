import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Label,
  Form,
  FormGroup,
} from 'reactstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import { endpoint } from '../../../config/firebase.config';

export default class CreateModal extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  state = {
    numberOfTickets: 1,
    meetingDuration: 10,
    loading: false,
  };

  onChangeNumberOfTickets = ({ target: { value } }) => {
    this.setState({ numberOfTickets: value });
  };

  onChangeMeetingDuration = ({ target: { value } }) => {
    this.setState({ meetingDuration: value });
  };

  onCreateClick = () => {
    this.setState({ loading: true }, async () => {
      const { numberOfTickets, meetingDuration } = this.state;
      try {
        const result = await axios.post(endpoint.create, {
          tickets: numberOfTickets,
          durationMinutes: meetingDuration,
        });

        this.props.history.push(`${result.data.id}/view`);
      } catch (ex) {
        console.error(ex);
        this.setState({ loading: false });
      }
    });
  };

  render() {
    const { isOpen, onClose } = this.props;
    const { numberOfTickets, meetingDuration, loading } = this.state;
    const btnClassName = loading ? 'App-btn--loading' : '';

    return (
      <Modal isOpen={isOpen}>
        <ModalHeader>Create Refinement</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for={'numberOfTickets'}>Number of Tickets</Label>
              <Input
                id={'numberOfTickets'}
                type={'number'}
                value={numberOfTickets}
                onChange={this.onChangeNumberOfTickets}
              />
            </FormGroup>
            <FormGroup>
              <Label for={'meetingDuration'}>Meeting Duration (Minutes)</Label>
              <Input
                id={'meetingDuration'}
                type={'number'}
                value={meetingDuration}
                onChange={this.onChangeMeetingDuration}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color={'primary'}
            className={btnClassName}
            onClick={this.onCreateClick}
            disabled={loading || !numberOfTickets || !meetingDuration}
          >
            Create
          </Button>{' '}
          <Button color={'secondary'} onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
