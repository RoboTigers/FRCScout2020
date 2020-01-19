import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./PitContent.css";
import "./Counter.js";
import Counter from "./Counter.js";
import Logo from "./1796NumberswithScratch.png";

class PitContent extends Component {
  state = {
    validated: false,
    widthSize: "",
    heightSize: "",
    group: "Group 1 Red Alliance",
    teamNumber: "",
    weight: "",
    height: "",
    driveTrain: "",
    driveTrains: [
      { id: 1, label: "Tank" },
      { id: 2, label: "Swerve" },
      { id: 3, label: "Mecanum" },
      { id: 4, label: "H-Drive" }
    ],
    driveTrainMotors: [
      { id: 1, label: "Falcon 500", value: 0, min: 0, max: 10 },
      { id: 2, label: "NEO", value: 0, min: 0, max: 10 },
      { id: 3, label: "CIM", value: 0, min: 0, max: 10 },
      { id: 4, label: "Mini-CIM", value: 0, min: 0, max: 10 },
      { id: 5, label: "Other", motorName: "", value: 0, min: 0, max: 10 }
    ],
    driveTrainWheelsValid: false,
    // prettier-ignore
    wheels: [
      { id: 1, label: "Traction", value: false, count: 0, size: 0, min: 1, max: 10 },
      { id: 2, label: "Omni", value: false, count: 0, size: 0, min: 1, max: 10 },
      { id: 3, label: "Colson (Rubber)", value: false, count: 0, size: 0, min: 1, max: 10 },
      { id: 4, label: "Pneumatic", value: false, count: 0, size: 0, min: 1, max: 10 },
      { id: 5, label: "Mecanum", value: false, count: 0, size: 0, min: 1, max: 10 },
      { id: 6, label: "Other", wheelName: "", value: false, count: 0, size: 0, min: 1, max: 10 }
    ],
    driveComments: "",
    programmingLanguage: "",
    programmingLanguages: [
      { id: 1, label: "Java", value: false },
      { id: 2, label: "C++", value: false },
      { id: 3, label: "LabView", value: false }
    ],
    autoComments: "",
    mechanismsValid: false,
    mechanisms: [
      { id: 1, label: "Drive under the Trench", value: false },
      { id: 2, label: "Receive balls from Human Feeder Station", value: false },
      { id: 3, label: "Pickup from the floor", value: false },
      { id: 4, label: "Score in the Bottom Port", value: false },
      { id: 5, label: "Ferry balls", value: false },
      { id: 6, label: "Complete Rotation Control", value: false },
      { id: 7, label: "Complete Position Control", value: false },
      { id: 8, label: "Hang Alone", value: false },
      { id: 9, label: "Buddy Hang", value: false },
      { id: 10, label: "Buddy Hang + one other robot", value: false },
      { id: 11, label: "Triple Hang", value: false },
      { id: 12, label: "Level", value: false },
      { id: 13, label: "None", value: false }
    ],
    workingOnComments: "",
    closingComments: ""
  };

  componentDidMount() {
    this.setState({
      widthSize: window.innerWidth <= 760 ? "90%" : "50%"
    });
    this.setState({ heightSize: window.innerHeight + "px" });
  }

  handleGroupChange = event => {
    this.setState({ group: event.target.value });
  };

  checkTeamNum = event => {
    let value = event.target.value;
    let max = parseInt(event.target.max);
    let min = parseInt(event.target.min);
    if (value > max) {
      event.target.value = parseInt(value.toString().slice(0, 4), 10);
    } else if (value < min) {
      event.target.value = "";
    }
    this.setState({ teamNumber: event.target.value });
  };

  checkWeight = event => {
    let value = event.target.value;
    let max = parseFloat(event.target.max);
    let min = parseFloat(event.target.min);
    if (value > max) {
      event.target.value = max;
    } else if (value < min) {
      event.target.value = "";
    }
    this.setState({ weight: event.target.value });
  };

  checkHeight = event => {
    let value = event.target.value;
    let max = parseFloat(event.target.max);
    let min = parseFloat(event.target.min);
    if (value > max) {
      event.target.value = max;
    } else if (value < min) {
      event.target.value = "";
    }
    this.setState({ height: event.target.value });
  };

  handleDriveChange = driveTrain => {
    this.setState({ driveTrain: driveTrain.label });
  };

  handleMotorDecrement = motor => {
    const motors = [...this.state.driveTrainMotors];
    const index = motors.indexOf(motor);
    motors[index] = { ...motor };
    if (motors[index].value === motors[index].min) {
    } else {
      motors[index].value = motors[index].value - 1;
    }
    this.setState({ driveTrainMotors: motors });
  };

  handleMotorIncrement = motor => {
    const motors = [...this.state.driveTrainMotors];
    const index = motors.indexOf(motor);
    motors[index] = { ...motor };
    if (motors[index].value === motors[index].max) {
    } else {
      motors[index].value = motors[index].value + 1;
    }
    this.setState({ driveTrainMotors: motors });
  };

  handleOtherMotor = (event, motor) => {
    const motors = [...this.state.driveTrainMotors];
    const index = motors.indexOf(motor);
    motors[index] = { ...motor };
    motors[index].motorName = event.target.value;
    this.setState({ driveTrainMotors: motors });
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
      return null;
    });
    this.setState({ driveTrainWheelsValid: newValidity });
  };

  checkWheelSize = (event, wheel) => {
    let value = event.target.value;
    let max = parseFloat(event.target.max);
    let min = parseFloat(event.target.min);
    if (value > max) {
      event.target.value = max;
    } else if (value < min) {
      event.target.value = "";
    }
    const wheels = [...this.state.wheels];
    const index = wheels.indexOf(wheel);
    wheels[index] = { ...wheel };
    wheels[index].size = parseFloat(event.target.value);
    this.setState({ wheels });
  };

  handleWheelDecrement = wheel => {
    const wheels = [...this.state.wheels];
    const index = wheels.indexOf(wheel);
    wheels[index] = { ...wheel };
    if (wheels[index].count === wheels[index].min) {
    } else {
      wheels[index].count = wheels[index].count - 1;
    }
    this.setState({ wheels });
  };

  handleWheelIncrement = wheel => {
    const wheels = [...this.state.wheels];
    const index = wheels.indexOf(wheel);
    wheels[index] = { ...wheel };
    if (wheels[index].count === wheels[index].max) {
    } else {
      wheels[index].count = wheels[index].count + 1;
    }
    this.setState({ wheels });
  };

  handleOtherWheel = (event, wheel) => {
    const wheels = [...this.state.wheels];
    const index = wheels.indexOf(wheel);
    wheels[index] = { ...wheel };
    wheels[index].wheelName = event.target.value;
    this.setState({ wheels });
  };

  handleDriveComment = event => {
    this.setState({ driveComments: event.target.value });
  };

  handleProgrammingChange = language => {
    this.setState({ programmingLanguage: language.label });
  };

  handleAutoComment = event => {
    this.setState({ autoComments: event.target.value });
  };

  handleMechanismClick = mechanism => {
    const mechanisms = [...this.state.mechanisms];
    const index = mechanisms.indexOf(mechanism);
    mechanisms[index] = { ...mechanism };
    mechanisms[index].value = !mechanisms[index].value;
    this.setState({ mechanisms });
    let newValidity = false;
    mechanisms.map(mechanism => {
      newValidity = mechanism.value || newValidity;
      return null;
    });
    this.setState({ mechanismsValid: newValidity });
  };

  handleWorkingOnComment = event => {
    this.setState({ workingOnComments: event.target.value });
  };

  handleClosingComment = event => {
    this.setState({ closingComments: event.target.value });
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
        <div className="justify-content-center">
          <img
            src={Logo}
            style={{
              width: this.state.widthSize === "90%" ? "70%" : "30%",
              marginTop: "20px",
              marginLeft: "10px"
            }}
          />
        </div>
        <div style={{ width: this.state.widthSize }} className="div-second">
          <Form
            noValidate
            validated={this.state.validated}
            onSubmit={this.handleSumbit}
            className="pit-form"
          >
            <div className="div-form">
              <Form.Group style={{ width: "80%", marginLeft: "1%" }} as={Row}>
                <Form.Label
                  className="mb-1"
                  style={{
                    fontFamily: "Helvetica, Arial",
                    fontSize: "110%"
                  }}
                >
                  Group:
                </Form.Label>
              </Form.Group>
              <Form.Group style={{ width: "80%", marginLeft: "2%" }} as={Row}>
                <Form.Control
                  className="mb-1"
                  required
                  as="select"
                  onChange={this.handleGroupChange}
                  style={{ background: "none" }}
                >
                  <option>Group 1 Red Alliance</option>
                  <option>Group 2 Red Alliance</option>
                  <option>Group 3 Red Alliance</option>
                  <option>Group 1 Blue Alliance</option>
                  <option>Group 2 Blue Alliance</option>
                  <option>Group 3 Blue Alliance</option>
                </Form.Control>
              </Form.Group>
            </div>
            <div className="div-form">
              <Form.Group style={{ width: "80%", marginLeft: "1%" }} as={Row}>
                <Form.Label
                  className="mb-1"
                  style={{
                    fontFamily: "Helvetica",
                    fontSize: "110%"
                  }}
                >
                  Team Number:
                </Form.Label>
              </Form.Group>
              <Form.Group style={{ width: "80%", marginLeft: "2%" }} as={Row}>
                <Form.Control
                  autoComplete="off"
                  type="number"
                  max={9999}
                  min={1}
                  placeholder="Team Number"
                  onChange={this.checkTeamNum}
                  required
                  className="mb-1"
                  style={{ background: "none" }}
                />
                <Form.Control.Feedback type="invalid">
                  Please input a team number.
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="div-form">
              <Form.Group style={{ width: "80%", marginLeft: "1%" }} as={Row}>
                <Form.Label
                  className="mb-1"
                  style={{
                    fontFamily: "Helvetica, Arial",
                    fontSize: "110%"
                  }}
                >
                  Weight:
                </Form.Label>
              </Form.Group>
              <Form.Group style={{ width: "80%", marginLeft: "2%" }} as={Row}>
                <Form.Control
                  autoComplete="off"
                  type="number"
                  max={500}
                  min={0}
                  step="0.0001"
                  placeholder="Weight (lbs)"
                  onChange={this.checkWeight}
                  required
                  className="mb-1"
                  style={{ background: "none" }}
                />
                <Form.Control.Feedback type="invalid">
                  Please input a weight.
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="div-form">
              <Form.Group style={{ width: "80%", marginLeft: "1%" }} as={Row}>
                <Form.Label
                  className="mb-1"
                  style={{
                    fontFamily: "Helvetica, Arial",
                    fontSize: "110%"
                  }}
                >
                  Height:
                </Form.Label>
              </Form.Group>
              <Form.Group style={{ width: "80%", marginLeft: "2%" }} as={Row}>
                <Form.Control
                  autoComplete="off"
                  type="number"
                  max={100}
                  min={0}
                  step="0.0001"
                  placeholder="Height (inches)"
                  onChange={this.checkHeight}
                  required
                  className="mb-1"
                  style={{ background: "none" }}
                />
                <Form.Control.Feedback type="invalid">
                  Please input a height.
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="div-form">
              <Form.Group style={{ width: "80%", marginLeft: "1%" }} as={Row}>
                <Form.Label
                  className="mb-1"
                  style={{
                    fontFamily: "Helvetica, Arial",
                    fontSize: "110%"
                  }}
                >
                  Drive Train:
                </Form.Label>
              </Form.Group>
              <Form.Group
                style={{
                  width: "100%",
                  marginLeft: "2%",
                  fontFamily: "Helvetica, Arial"
                }}
                as={Row}
                className="mb-3"
              >
                {this.state.driveTrains.map(driveTrain => (
                  <Form.Check
                    style={{ fontFamily: "Helvetica, Arial" }}
                    required
                    inline
                    custom
                    onClick={() => this.handleDriveChange(driveTrain)}
                    label={driveTrain.label}
                    type="radio"
                    name="driveTrains"
                    id={"driveTrain" + driveTrain.id}
                    key={"driveTrain" + driveTrain.id}
                  />
                ))}
              </Form.Group>
              <Form.Group style={{ width: "100%" }}>
                {this.state.driveTrainMotors.map(motor => (
                  <Form.Row
                    className="mb-2 justify-content-center"
                    key={"driveTrainMotorRow" + motor.id}
                  >
                    <Counter
                      minWidth="170px"
                      count={motor.value}
                      margin={
                        motor.label !== "Other"
                          ? "7px 0px 0px 0px"
                          : "3px 0px 0px 0px"
                      }
                      colon=": "
                      onIncrement={() => this.handleMotorIncrement(motor)}
                      onDecrement={() => this.handleMotorDecrement(motor)}
                      label={
                        motor.label !== "Other" ? (
                          motor.label
                        ) : (
                          <span
                            style={{
                              fontFamily: "Helvetica, Arial",
                              maxWidth: "170px",
                              width: "100px",
                              display: "inline-block",
                              marginLeft: "10px"
                            }}
                          >
                            <Form.Control
                              // isValid={true}
                              required={false}
                              autoComplete="off"
                              type="text"
                              placeholder={motor.label}
                              onChange={event =>
                                this.handleOtherMotor(event, motor)
                              }
                              style={{
                                fontFamily: "Helvetica, Arial",
                                textJustify: "center",
                                textAlign: "center",
                                fontSize: "90%",
                                backgroundImage: "none",
                                background: "none",
                                backgroundSize: "0px"
                                // border: "none"
                              }}
                            />
                          </span>
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
                style={{ width: "100%", marginLeft: "2%" }}
                className="mt-4"
              >
                {this.state.wheels.map(wheel => (
                  <Form.Row
                    key={"driveTrainWheelRow" + wheel.id}
                    className="mb-2"
                  >
                    <Col xs="4" style={{ textAlign: "left" }}>
                      <Form.Check
                        required={!this.state.driveTrainWheelsValid}
                        onChange={() => this.handleWheelClick(wheel)}
                        custom
                        style={{
                          fontSize: "90%",
                          fontFamily: "Helvetica, Arial"
                        }}
                        type="checkbox"
                        name="driveTrainWheels"
                        id={"driveTrainWheel" + wheel.id}
                        key={"driveTrainWheel" + wheel.id}
                        label={
                          wheel.label !== "Other" ? (
                            wheel.label
                          ) : (
                            <Form.Control
                              autoComplete="off"
                              required
                              type="text"
                              placeholder={wheel.label}
                              disabled={!wheel.value}
                              onChange={event =>
                                this.handleOtherWheel(event, wheel)
                              }
                              style={{
                                fontFamily: "Helvetica, Arial",
                                maxWidth: "80px",
                                fontSize: "90%",
                                backgroundColor: "transparent"
                              }}
                            />
                          )
                        }
                      />
                    </Col>
                    <Col xs="3" style={{ textAlign: "center" }}>
                      <Form.Control
                        autoComplete="off"
                        type="number"
                        step="0.001"
                        max={12}
                        min={1}
                        placeholder="Size (in)"
                        required
                        disabled={!wheel.value}
                        onChange={event => this.checkWheelSize(event, wheel)}
                        style={{
                          fontFamily: "Helvetica, Arial",
                          fontSize: "65%",
                          textAlign: "center",
                          marginLeft: "6px",
                          backgroundColor: "transparent"
                        }}
                      />
                    </Col>
                    <Col>
                      <Counter
                        count={wheel.count}
                        onDecrement={() => this.handleWheelDecrement(wheel)}
                        onIncrement={() => this.handleWheelIncrement(wheel)}
                        colon=""
                        label=""
                        minWidth="24px"
                        maxWidth="24px"
                        margin="0px 0px 0px 0px"
                        disabled={!wheel.value}
                        size="sm"
                        marginRight="0px"
                        key={"driveTrainWheelCounter" + wheel.id}
                      />
                    </Col>
                  </Form.Row>
                ))}
              </Form.Group>
              <div
                style={{
                  display: "inline-block",
                  width: "80%",
                  marginTop: "5px"
                }}
              >
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    type="text"
                    placeholder="Any additional comments about drive train"
                    onChange={this.handleDriveComment}
                    rows="3"
                    style={{
                      background: "none",
                      fontFamily: "Helvetica, Arial"
                    }}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="div-form">
              <Form.Group style={{ width: "80%", marginLeft: "1%" }} as={Row}>
                <Form.Label
                  className="mb-1"
                  style={{
                    fontFamily: "Helvetica, Arial",
                    fontSize: "110%"
                  }}
                >
                  Autonomous:
                </Form.Label>
              </Form.Group>
              <Form.Group
                style={{ width: "100%", marginLeft: "2%" }}
                as={Row}
                className="mb-3"
              >
                {this.state.programmingLanguages.map(language => (
                  <Form.Check
                    style={{ fontFamily: "Helvetica, Arial" }}
                    required
                    inline
                    custom
                    label={language.label}
                    type="radio"
                    name="programmingLanguages"
                    onClick={() => this.handleProgrammingChange(language)}
                    id={"language" + language.id}
                    key={"language" + language.id}
                  />
                ))}
              </Form.Group>
              <div
                style={{
                  display: "inline-block",
                  width: "80%",
                  marginTop: "5px"
                }}
              >
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    type="text"
                    onChange={this.handleAutoComment}
                    placeholder="What is their usual strategy in auto?"
                    className="mb-0"
                    rows="3"
                    style={{
                      background: "none",
                      fontFamily: "Helvetica, Arial"
                    }}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="div-form">
              <Form.Group style={{ width: "80%", marginLeft: "1%" }} as={Row}>
                <Form.Label
                  style={{
                    fontFamily: "Helvetica, Arial",
                    fontSize: "110%"
                  }}
                >
                  Abilities:
                </Form.Label>
              </Form.Group>
              <Form.Group style={{ width: "100%", marginLeft: "2%" }}>
                {this.state.mechanisms.map(mechanism => (
                  <Form.Row
                    key={"mechanismRow" + mechanism.id}
                    className="mb-2"
                  >
                    <Form.Check
                      required={!this.state.mechanismsValid}
                      onChange={() => this.handleMechanismClick(mechanism)}
                      custom
                      style={{
                        fontSize: "90%",
                        fontFamily: "Helvetica, Arial"
                      }}
                      label={mechanism.label}
                      type="checkbox"
                      name="mechanisms"
                      id={"mechanism" + mechanism.id}
                      key={"mechanism" + mechanism.id}
                    />
                  </Form.Row>
                ))}
              </Form.Group>
            </div>
            <div className="div-form">
              <Form.Group style={{ width: "80%", marginLeft: "1%" }} as={Row}>
                <Form.Label
                  style={{
                    fontFamily: "Helvetica, Arial",
                    fontSize: "110%"
                  }}
                >
                  Closing:
                </Form.Label>
              </Form.Group>
              <div
                style={{
                  display: "inline-block",
                  width: "80%",
                  marginTop: "5px"
                }}
              >
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    type="text"
                    placeholder="Is there anything that the team is still working on?"
                    onChange={this.handleWorkingOnComment}
                    className="mb-0"
                    rows="3"
                    style={{
                      background: "none",
                      fontFamily: "Helvetica, Arial"
                    }}
                  />
                </Form.Group>
              </div>
              <div
                style={{
                  display: "inline-block",
                  width: "80%",
                  marginTop: "5px"
                }}
              >
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    type="text"
                    placeholder="Additional comments"
                    onChange={this.handleClosingComment}
                    className="mb-0"
                    rows="2"
                    style={{
                      background: "none",
                      fontFamily: "Helvetica, Arial"
                    }}
                  />
                </Form.Group>
              </div>
            </div>
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
