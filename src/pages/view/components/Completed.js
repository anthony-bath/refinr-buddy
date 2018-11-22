import React, { Component } from 'react';
import { Container, Row, Col, Alert, Button } from 'reactstrap';

export default class Completed extends Component {
  onSummaryClick = () => {
    this.props.history.push(`summary`);
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
            <Button color={'primary'} onClick={this.onSummaryClick}>
              Summary
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
