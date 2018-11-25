import React, { Component } from 'react';
import { Container, Row, Col, Alert, Button, ButtonGroup } from 'reactstrap';

export default class Completed extends Component {
  onSummaryClick = () => {
    this.props.history.push(`summary`);
  };

  onHomeClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Alert color={'info'}>
              The Refinement Session has been completed.
            </Alert>
          </Col>
        </Row>
        <Row>
          <Col>
            <ButtonGroup>
              <Button onClick={this.onHomeClick}>Home</Button>
              <Button onClick={this.onSummaryClick}>Summary</Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}
