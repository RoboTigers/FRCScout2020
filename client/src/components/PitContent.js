import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./PitContent.css";
import "./Counter.js";
import Counter from "./Counter.js";

class PitContent extends Component {
  state = {
    validated: false,
    widthSize: "",
    heightSize: "",
    driveTrains: [
      { id: 1, label: "Tank", value: false },
      { id: 2, label: "Swerve", value: false },
      { id: 3, label: "Mecanum", value: false },
      { id: 4, label: "H-Drive", value: false }
    ],
    driveTrainWheelsValid: false,
    driveTrainMotors: [
      { id: 1, label: "Falcon 500", value: 0 },
      { id: 2, label: "NEO", value: 0 },
      { id: 3, label: "CIM", value: 0 },
      { id: 4, label: "Mini-CIM", value: 0 },
      { id: 5, label: "Other", value: 0 }
    ],
    wheels: [
      { id: 1, label: "Traction", value: false },
      { id: 2, label: "Omni", value: false },
      { id: 3, label: "Colson (Rubber)", value: false },
      { id: 4, label: "Pneumatic", value: false },
      { id: 5, label: "Mecanum", value: false },
      { id: 6, label: "Other", value: false }
    ]
  };

  componentDidMount() {
    console.log(window.innerWidth);
    this.setState({
      widthSize: window.innerWidth <= 760 ? "90%" : "50%"
    });
    this.setState({ heightSize: window.innerHeight + "px" });
    console.log(document.body.scrollHeight + "px");
  }

  checkTeamNum = event => {
    console.log(this.state.widthSize);
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

  handleWheelClick = wheel => {
    const wheels = [...this.state.wheels];
    const index = wheels.indexOf(wheel);
    wheels[index] = { ...wheel };
    wheels[index].value = !wheels[index].value;
    this.setState({ wheels });
    let newValidity = false;
    wheels.map(wheel => {
      newValidity = wheel.value || newValidity;
    });
    this.setState({ driveTrainWheelsValid: newValidity });
    console.log(this.state.driveTrainWheelsValid);
  };

  render() {
    return (
      <div className="div-main">
        <div style={{ width: this.state.widthSize }} className="div-second">
          <Form
            noValidate
            validated={this.state.validated}
            onSubmit={this.handleSumbit}
            className="pit-form"
          >
            <div className="div-form">
              <Form.Group style={{ width: "80%", marginLeft: "2%" }} as={Row}>
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
            </div>
            <div className="div-form">
              <Form.Group style={{ width: "80%", marginLeft: "2%" }} as={Row}>
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
            </div>
            <div className="div-form">
              <Form.Group style={{ width: "80%", marginLeft: "2%" }} as={Row}>
                <Form.Label>Drive Train:</Form.Label>
              </Form.Group>
              <Form.Group
                style={{ width: "100%", marginLeft: "2%" }}
                as={Row}
                className="mt-3 mb-3"
              >
                {this.state.driveTrains.map(driveTrain => (
                  <Form.Check
                    required
                    inline
                    custom
                    label={driveTrain.label}
                    type="radio"
                    name="driveTrains"
                    id={"driveTrain" + driveTrain.id}
                    key={"driveTrain" + driveTrain.id}
                  />
                ))}
              </Form.Group>
              <Form.Group>
                {this.state.driveTrainMotors.map(motor => (
                  <Form.Row
                    className="mb-2 justify-content-center"
                    key={"driveTrainMotorRow" + motor.id}
                  >
                    <Counter
                      min={0}
                      max={10}
                      minWidth="170px"
                      colon=":"
                      margin="0px 0px 0px 0px"
                      label={
                        motor.label !== "Other" ? (
                          motor.label
                        ) : (
                          <div
                            style={{
                              maxWidth: "170px",
                              width: "100px",
                              display: "inline-block",
                              marginLeft: "10px"
                            }}
                          >
                            <Form.Control
                              type="text"
                              placeholder={motor.label}
                              style={{
                                textAlign: "center",
                                fontSize: "90%"
                              }}
                            />
                          </div>
                        )
                      }
                      disabled={false}
                      size="xs"
                      marginRight="0px"
                      id={"driveTrainMotor" + motor.id}
                      key={"driveTrainMotor" + motor.id}
                    />
                  </Form.Row>
                ))}
              </Form.Group>
              <Form.Group
                style={{ width: "80%", marginLeft: "2%" }}
                className="mt-4"
              >
                {this.state.wheels.map(wheel => (
                  <Form.Row
                    key={"driveTrainWheelRow" + wheel.id}
                    className="mb-2"
                  >
                    <Col xs="7" style={{ textAlign: "left" }}>
                      <Form.Check
                        required={!this.state.driveTrainWheelsValid}
                        onChange={() => this.handleWheelClick(wheel)}
                        // inline
                        custom
                        label={
                          wheel.label !== "Other" ? (
                            wheel.label
                          ) : (
                            <Form.Control
                              style={{ maxWidth: "90px" }}
                              type="text"
                              placeholder={wheel.label}
                              disabled={!wheel.value}
                              id="driveTrainWheelOther"
                            />
                          )
                        }
                        type="checkbox"
                        name="driveTrainWheels"
                        id={"driveTrainWheel" + wheel.id}
                        key={"driveTrainWheel" + wheel.id}
                      />
                    </Col>
                    <Col>
                      <Counter
                        min={0}
                        max={10}
                        margin="0px 5px 0px 5px"
                        disabled={!wheel.value}
                        size="sm"
                        marginRight="0px"
                        key={"driveTrainWheelCounter" + wheel.id}
                      />
                    </Col>
                  </Form.Row>
                ))}
              </Form.Group>
              <Button type="submit" className="btn-lg">
                Submit form
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default PitContent;
