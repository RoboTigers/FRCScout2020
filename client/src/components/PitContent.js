import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./PitContent.css";
import "./Counter.js";
import Counter from "./Counter.js";

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
      <div className="div-main">
        <div className="div-form">
          <Form
            noValidate
            validated={this.state.validated}
            onSubmit={this.handleSumbit}
            className="pit-form"
          >
            <Form.Group as={Row} controlId="formGroup">
              <Form.Label className="mb-3">Group:</Form.Label>
              <Form.Control className="mb-3" required as="select">
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
            <Form.Group as={Row} controlId="formTeamNum">
              <Form.Label className="mb-3">Team Number:</Form.Label>
              <Form.Control
                type="number"
                max="9999"
                min="1"
                placeholder="Team Number"
                onChange={this.checkTeamNum}
                required
                className="mb-4"
              />
              <Form.Control.Feedback type="invalid">
                Please input a team number.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Row} controlId="driveTrainLabel">
              <Form.Label>Drive Train:</Form.Label>
            </Form.Group>
            <Form.Group as={Row} controlId="formDrive" className="mt-3 mb-4">
              <Form.Check
                required
                inline
                custom
                label="Tank"
                type="radio"
                name="radios"
                id="radio1"
                className=""
              />
              <Form.Check
                required
                inline
                custom
                label="Swerve"
                type="radio"
                name="radios"
                id="radio2"
                className=""
              />
              <Form.Check
                required
                inline
                custom
                label="Mecanum"
                type="radio"
                name="radios"
                id="radio3"
                className=""
              />
            </Form.Group>
            <Form.Group
              className="justify-content-center"
              as={Row}
              controlId="formDriveMotors"
            >
              <Counter min={0} max={10} label="Drive Train Motors:"></Counter>
            </Form.Group>
            <Form.Group
              className="justify-content-center"
              as={Row}
              controlId="formDriveMotorsTypes1"
            >
              <Counter min={0} max={10} label="Falcon:"></Counter>
            </Form.Group>
            <Form.Group
              className="justify-content-center"
              as={Row}
              controlId="formDriveMotorsTypes2"
            >
              <Counter min={0} max={10} label="Neo:"></Counter>
            </Form.Group>
            <Form.Group
              className="justify-content-center"
              as={Row}
              controlId="formDriveMotorsTypes3"
            >
              <Counter min={0} max={10} label="Cim:"></Counter>
            </Form.Group>
            <Button type="submit" className="btn-lg">
              Submit form
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default PitContent;
