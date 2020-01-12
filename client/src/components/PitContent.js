import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./PitContent.css";

class PitContent extends Component {
  state = {
    validated: false
  };

  checkTeamNum = event => {
    let value = event.target.value;
    console.log(value);
    if (value > 9999) {
      event.target.value = parseInt(value.toString().slice(0, 4), 10);
    } else if (value < 1) {
      event.target.value = "";
    }
  };

  handleSumbit = event => {
    let form = event.target;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState({ validated: true });
  };

  render() {
    return (
      <Form
        noValidate
        validated={this.state.validated}
        onSubmit={this.handleSumbit}
        className="pit-form"
      >
        <Form.Group controlId="formGroup" className="w-75">
          <Form.Label className="float-left mb-3">Group:</Form.Label>
          <Form.Control required as="select" placeholder="Choose...">
            <option>Group 1 Red Alliance</option>
            <option>Group 2 Red Alliance</option>
            <option>Group 3 Red Alliance</option>
            <option>Group 1 Blue Alliance</option>
            <option>Group 2 Blue Alliance</option>
            <option>Group 3 Blue Alliance</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please choose a group.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formTeamNum" className="w-75">
          <Form.Label className="float-left mb-3">Team Number:</Form.Label>
          <Form.Control
            type="number"
            max="9999"
            min="1"
            placeholder="Team Number"
            onChange={this.checkTeamNum}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please input a team number.
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="mt-3">
          Submit form
        </Button>
      </Form>
    );
  }
}

export default PitContent;
