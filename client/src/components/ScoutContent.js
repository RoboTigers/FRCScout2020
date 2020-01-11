import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class ScoutContent extends Component {
  render() {
    return (
      <Form>
        <Form.Group className="mt-3" as={Row} controlId="formCompetition">
          <Form.Label column xs="2"></Form.Label>
          <Col xs="6">
            <Form.Control as="select">
              <option>Hudson</option>
              <option>Long Island</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formTeamNum">
          <Form.Label column xs="2">
            Team Number
          </Form.Label>
          <Col xs="9">
            <Form.Control type="text" placeholder="Team Number" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formMatchNum">
          <Form.Label column xs="2">
            Match Number
          </Form.Label>
          <Col xs="9">
            <Form.Control type="text" placeholder="Match Number" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formAuto">
          <Form.Label column xs="2">
            Auto
          </Form.Label>
          <Col xs="1">
            <Form.Check custom type="switch" label="" />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default ScoutContent;
