import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './PitContent.css';
import './Counter.js';
import Counter from './Counter.js';
import Logo from './1796NumberswithScratch.png';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import ImagePreview from './ImagePreview';

class PitContent extends Component {
  state = {
    retrieved: '',
    markForFollowUp: false,
    validated: false,
    widthSize: '',
    heightSize: '',
    group: 'Group 1 Red Alliance',
    teamNumber: '',
    teamName: '',
    competition: '',
    weight: '',
    height: '',
    driveTrain: '',
    driveTrains: [
      { id: 1, label: 'Tank' },
      { id: 2, label: 'Swerve' },
      { id: 3, label: 'Mecanum' },
      { id: 4, label: 'H-Drive' }
    ],
    driveTrainMotors: [
      { id: 1, label: 'Falcon 500', value: 0, min: 0, max: 10 },
      { id: 2, label: 'NEO', value: 0, min: 0, max: 10 },
      { id: 3, label: 'CIM', value: 0, min: 0, max: 10 },
      { id: 4, label: 'Mini-CIM', value: 0, min: 0, max: 10 },
      { id: 5, label: 'Other', motorName: '', value: 0, min: 0, max: 10 }
    ],
    driveTrainWheelsValid: false,
    driveTrainWheelSizesValid: false,
    // prettier-ignore
    wheels: [
      { id: 1, label: "Traction", value: false, count: 0, size: "", min: 0, max: 10 },
      { id: 2, label: "Omni", value: false, count: 0, size: "", min: 0, max: 10 },
      { id: 3, label: "Colson (Rubber)", value: false, count: 0, size: "", min: 0, max: 10 },
      { id: 4, label: "Pneumatic", value: false, count: 0, size: "", min: 0, max: 10 },
      { id: 5, label: "Mecanum", value: false, count: 0, size: "", min: 0, max: 10 },
      { id: 6, label: "Other", wheelName: "", value: false, count: 0, size: "", min: 0, max: 10 }
    ],
    driveComments: '',
    programmingLanguage: '',
    programmingLanguages: [
      { id: 1, label: 'Java', value: false },
      { id: 2, label: 'C++', value: false },
      { id: 3, label: 'LabView', value: false }
    ],
    startingPosition: '',
    startingPositions: [
      { id: 1, label: 'Left', value: false },
      { id: 2, label: 'Center', value: false },
      { id: 3, label: 'Right', value: false }
    ],
    autoComments: '',
    mechanismsValid: false,
    mechanisms: [
      { id: 1, label: 'Drive under the Trench', value: false },
      { id: 2, label: 'Receive balls from Human Feeder Station', value: false },
      { id: 3, label: 'Pickup from the floor', value: false },
      { id: 4, label: 'Score in the Bottom Port', value: false },
      { id: 5, label: 'Ferry balls', value: false },
      { id: 6, label: 'Complete Rotation Control', value: false },
      { id: 7, label: 'Complete Position Control', value: false },
      { id: 8, label: 'Hang Alone', value: false },
      { id: 9, label: 'Buddy Hang', value: false },
      { id: 10, label: 'Buddy Hang + one other robot', value: false },
      { id: 11, label: 'Triple Hang', value: false },
      { id: 12, label: 'Level', value: false },
      { id: 13, label: 'None', value: false }
    ],
    workingOnComments: '',
    closingComments: '',
    cameraActivated: false,
    dataUri: ''
  };

  componentDidMount() {
    fetch(
      `/api/competitions/${this.props.match.params.competition}/team/${this.props.match.params.team}/pit`
    )
      .then(response => response.json())
      .then(data => {
        if (data.pitFormData.length === 0) {
          this.setState({ retrieved: 'invalid' });
        } else {
          console.log(data.pitFormData);
          this.setState({ retrieved: 'valid' });
          const existingData = data.pitFormData[0];
          this.setState({
            group:
              existingData.group_name === null
                ? this.state.group
                : existingData.group_name
          });
          this.setState({ teamNumber: existingData.team_num });
          this.setState({ teamName: existingData.team_name });
          this.setState({ competition: existingData.short_name });
          this.setState({
            weight: existingData.weight === null ? '' : existingData.weight
          });
          this.setState({
            height: existingData.height === null ? '' : existingData.height
          });
          this.setState({
            driveTrain:
              existingData.drive_train === null ? '' : existingData.drive_train
          });
          this.setState({
            driveTrainMotors:
              existingData.motors === null
                ? this.state.driveTrainMotors
                : existingData.motors
          });
          this.setState({
            wheels:
              existingData.wheels === null
                ? this.state.wheels
                : existingData.wheels
          });
          this.setState({
            driveComments:
              existingData.drive_comments === null
                ? ''
                : existingData.drive_comments
          });
          this.setState({
            programmingLanguage:
              existingData.code_language === null
                ? ''
                : existingData.code_language
          });
          this.setState({
            startingPosition:
              existingData.starting_position === null
                ? ''
                : existingData.starting_position
          });
          this.setState({
            autoComments:
              existingData.auto_comments === null
                ? ''
                : existingData.auto_comments
          });
          this.setState({
            mechanisms:
              existingData.abilities === null
                ? this.state.mechanisms
                : existingData.abilities
          });
          this.setState({
            workingOnComments:
              existingData.working_comments === null
                ? ''
                : existingData.working_comments
          });
          this.setState({
            closingComments:
              existingData.closing_comments === null
                ? ''
                : existingData.closing_comments
          });
          this.setState({
            markForFollowUp:
              existingData.status === null || existingData.status === 'Done'
                ? false
                : true
          });
          const filteredWheels = this.state.wheels.filter(wheel => wheel.value);
          this.setState({
            driveTrainWheelsValid: filteredWheels.length === 0 ? false : true
          });
          let newValidity = true;
          this.state.wheels
            .filter(wheel => wheel.value)
            .map(wheel => {
              if (wheel.size === '') {
                newValidity = false;
              }
            });
          this.setState({ driveTrainWheelSizesValid: newValidity });
          const filteredMechanisms = this.state.mechanisms.filter(
            mechanism => mechanism.value
          );
          this.setState({
            mechanismsValid: filteredMechanisms.length === 0 ? false : true
          });
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
    this.setState({
      widthSize: window.innerWidth <= 760 ? '90%' : '50%'
    });
    this.setState({ heightSize: window.innerHeight + 'px' });
  }

  handleGroupChange = event => {
    this.setState({ group: event.target.value });
  };

  checkTeamNum = event => {
    let value = event.target.value;
    let max = parseInt(event.target.max);
    let min = parseInt(event.target.min);
    if (value > max) {
      event.target.value = value.toString().slice(0, 4);
    } else if (value < min) {
      event.target.value = '';
    }
    this.setState({ teamNumber: event.target.value });
  };

  checkTeamInput = event => {
    if (event.keyCode === 190 || event.keyCode === 69) {
      event.preventDefault();
    }
  };

  checkWeight = event => {
    let value = event.target.value;
    let max = parseFloat(event.target.max);
    let min = parseFloat(event.target.min);
    if (value > max) {
      value = value.toString().slice(0, 3);
    } else if (value < min) {
      value = '';
    }
    this.setState({ weight: value });
  };

  checkHeight = event => {
    let value = event.target.value;
    let max = parseFloat(event.target.max);
    let min = parseFloat(event.target.min);
    if (value > max) {
      value = value.toString().slice(0, 2);
    } else if (value < min) {
      value = '';
    }
    this.setState({ height: value });
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
    console.log(this.state.driveTrainMotors);
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
  };

  handleWheelClick = wheel => {
    const wheels = [...this.state.wheels];
    const index = wheels.indexOf(wheel);
    wheels[index] = { ...wheel };
    wheels[index].value = !wheels[index].value;
    this.setState({ wheels });
    const filtered = wheels.filter(wheel => wheel.value);
    this.setState({
      driveTrainWheelsValid: filtered.length === 0 ? false : true
    });
  };

  checkWheelSize = (event, wheel) => {
    let value = event.target.value;
    let max = parseFloat(event.target.max);
    let min = parseFloat(event.target.min);
    if (value > max) {
      event.target.value = max;
    } else if (value < min) {
      event.target.value = '';
    }
    const wheels = [...this.state.wheels];
    const index = wheels.indexOf(wheel);
    wheels[index] = { ...wheel };
    wheels[index].size = event.target.value;
    this.setState({ wheels });
    let newValidity = true;
    wheels
      .filter(wheel => wheel.value)
      .map(wheel => {
        if (wheel.size === '') {
          newValidity = false;
        }
      });
    this.setState({ driveTrainWheelSizesValid: newValidity });
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
    console.log(this.state.programmingLanguage);
  };

  handlePositionChange = position => {
    this.setState({ startingPosition: position.label });
    console.log(this.state.startingPosition);
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
    const filtered = mechanisms.filter(mechanism => mechanism.value);
    this.setState({ mechanismsValid: filtered.length === 0 ? false : true });
  };

  handleWorkingOnComment = event => {
    this.setState({ workingOnComments: event.target.value });
  };

  handleClosingComment = event => {
    this.setState({ closingComments: event.target.value });
  };

  handleFollowUp = () => {
    this.setState({ markForFollowUp: !this.state.markForFollowUp });
  };

  handleCameraActivation = () => {
    this.setState({ cameraActivated: !this.state.cameraActivated });
  };

  handleTakePhoto = dataUri => {
    this.setState({ dataUri: dataUri });
    this.setState({ cameraActivated: false });
  };

  isFormValid() {
    return (
      this.state.weight !== '' &&
      this.state.height !== '' &&
      this.state.driveTrain !== '' &&
      this.state.driveTrainWheelsValid &&
      this.state.driveTrainWheelSizesValid &&
      this.state.programmingLanguage !== '' &&
      this.state.startingPosition !== '' &&
      this.state.mechanismsValid
    );
  }

  handleSumbit = event => {
    event.preventDefault();
    if (this.isFormValid() || this.state.markForFollowUp) {
      const data = {
        competition: this.state.competition,
        teamNum: this.state.teamNumber,
        status: this.state.markForFollowUp ? 'Follow Up' : 'Done',
        group_name: this.state.group,
        weight: this.state.weight === '' ? 0 : this.state.weight,
        height: this.state.height === '' ? 0 : this.state.height,
        drive_train: this.state.driveTrain,
        motors: JSON.stringify(this.state.driveTrainMotors),
        wheels: JSON.stringify(this.state.wheels),
        drive_comments: this.state.driveComments,
        code_language: this.state.programmingLanguage,
        starting_position: this.state.startingPosition,
        auto_comments: this.state.autoComments,
        abilities: JSON.stringify(this.state.mechanisms),
        working_comments: this.state.workingOnComments,
        closing_comments: this.state.closingComments
      };
      console.log(data);
      fetch('/api/submitPitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error', error);
        });
      alert('submitted');
    }
    this.setState({ validated: true });
  };

  render() {
    if (this.state.retrieved === '') {
      return null;
    } else if (this.state.retrieved === 'invalid') {
      return (
        <div className='div-main'>
          <h1 className='pt-4'>Invalid pit form request</h1>
        </div>
      );
    } else {
      if (this.state.cameraActivated) {
        return (
          <Camera
            idealResolution={{
              width: window.innerWidth,
              height: window.innerHeight
            }}
            isFullscreen={false}
            isMaxResolution={true}
            isImageMirror={false}
            idealFacingMode={FACING_MODES.ENVIRONMENT}
            onTakePhotoAnimationDone={dataUri => {
              this.handleTakePhoto(dataUri);
            }}
          />
        );
      } else {
        return (
          <div className='div-main'>
            <div className='justify-content-center'>
              <img
                alt='Logo'
                src={Logo}
                style={{
                  width: this.state.widthSize === '90%' ? '70%' : '30%',
                  marginTop: '20px',
                  marginLeft: '10px'
                }}
              />
            </div>
            <div style={{ width: this.state.widthSize }} className='div-second'>
              <div className='div-form'>
                <Form.Group style={{ width: '80%', marginLeft: '1%' }} as={Row}>
                  <Form.Label
                    className='mb-2'
                    style={{
                      fontFamily: 'Helvetica, Arial',
                      fontSize: '100%'
                    }}
                  >
                    Competition: {this.state.competition}
                  </Form.Label>
                </Form.Group>
                <Form.Group style={{ width: '80%', marginLeft: '1%' }} as={Row}>
                  <Form.Label
                    className='mb-2'
                    style={{
                      fontFamily: 'Helvetica, Arial',
                      fontSize: '100%'
                    }}
                  >
                    Team Number: {this.state.teamNumber}
                  </Form.Label>
                </Form.Group>
                <Form.Group
                  style={{ width: '100%', marginLeft: '1%' }}
                  as={Row}
                >
                  <Form.Label
                    className='mb-1'
                    style={{
                      fontFamily: 'Helvetica, Arial',
                      fontSize: '100%'
                    }}
                  >
                    Team Name: {this.state.teamName}
                  </Form.Label>
                </Form.Group>
              </div>
              <div className='div-form'>
                <Form.Group style={{ width: '80%', marginLeft: '1%' }} as={Row}>
                  <Form.Label
                    className='mb-1'
                    style={{
                      fontFamily: 'Helvetica, Arial',
                      fontSize: '110%'
                    }}
                  >
                    Group:
                  </Form.Label>
                </Form.Group>
                <Form.Group style={{ width: '80%', marginLeft: '2%' }} as={Row}>
                  <Form.Control
                    style={{
                      background: 'none',
                      fontFamily: 'Helvetica, Arial'
                    }}
                    className='mb-1'
                    as='select'
                    onChange={this.handleGroupChange}
                    value={this.state.group}
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
              <div className='div-form'>
                <Form.Group style={{ width: '80%', marginLeft: '1%' }} as={Row}>
                  <Form.Label
                    className='mb-1'
                    style={{
                      fontFamily: 'Helvetica, Arial',
                      fontSize: '110%'
                    }}
                  >
                    Weight:
                  </Form.Label>
                </Form.Group>
                <Form.Group style={{ width: '80%', marginLeft: '2%' }} as={Row}>
                  <Form.Control
                    value={this.state.weight}
                    autoComplete='off'
                    type='number'
                    max={500}
                    min={0}
                    placeholder='Weight (lbs)'
                    onChange={this.checkWeight}
                    isValid={
                      this.state.validated &&
                      this.state.weight !== '' &&
                      !this.state.markForFollowUp
                    }
                    isInvalid={
                      this.state.validated &&
                      this.state.weight === '' &&
                      !this.state.markForFollowUp
                    }
                    className='mb-1'
                    style={{
                      background: 'none',
                      fontFamily: 'Helvetica, Arial'
                    }}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please input a weight.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className='div-form'>
                <Form.Group style={{ width: '80%', marginLeft: '1%' }} as={Row}>
                  <Form.Label
                    className='mb-1'
                    style={{
                      fontFamily: 'Helvetica, Arial',
                      fontSize: '110%'
                    }}
                  >
                    Starting Height:
                  </Form.Label>
                </Form.Group>
                <Form.Group style={{ width: '80%', marginLeft: '2%' }} as={Row}>
                  <Form.Control
                    value={this.state.height}
                    autoComplete='off'
                    type='number'
                    max={100}
                    min={0}
                    isValid={
                      this.state.validated &&
                      this.state.height !== '' &&
                      !this.state.markForFollowUp
                    }
                    isInvalid={
                      this.state.validated &&
                      this.state.height === '' &&
                      !this.state.markForFollowUp
                    }
                    placeholder='Height (inches)'
                    onChange={this.checkHeight}
                    className='mb-1'
                    style={{
                      background: 'none',
                      fontFamily: 'Helvetica, Arial'
                    }}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please input a height.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className='div-form'>
                <Form.Group style={{ width: '80%', marginLeft: '1%' }} as={Row}>
                  <Form.Label
                    className='mb-1'
                    style={{
                      fontFamily: 'Helvetica, Arial',
                      fontSize: '110%'
                    }}
                  >
                    Drive Train:
                  </Form.Label>
                </Form.Group>
                <Form.Group
                  style={{
                    width: '100%',
                    marginLeft: '2%',
                    fontFamily: 'Helvetica, Arial'
                  }}
                  as={Row}
                  className='mb-3'
                >
                  {this.state.driveTrains.map(driveTrain => (
                    <Form.Check
                      isValid={
                        this.state.validated &&
                        !this.state.driveTrain !== '' &&
                        !this.state.markForFollowUp
                      }
                      isInvalid={
                        this.state.validated &&
                        this.state.driveTrain === '' &&
                        !this.state.markForFollowUp
                      }
                      style={{ fontFamily: 'Helvetica, Arial' }}
                      inline
                      custom
                      onChange={() => this.handleDriveChange(driveTrain)}
                      label={driveTrain.label}
                      type='radio'
                      autoComplete='off'
                      checked={this.state.driveTrain === driveTrain.label}
                      id={'driveTrain' + driveTrain.id}
                      key={'driveTrain' + driveTrain.id}
                    />
                  ))}
                </Form.Group>
                <Form.Group style={{ width: '100%' }}>
                  {this.state.driveTrainMotors.map(motor => (
                    <Form.Row
                      className='mb-2 justify-content-center'
                      key={'driveTrainMotorRow' + motor.id}
                    >
                      <Counter
                        minWidth='170px'
                        count={motor.value}
                        margin={
                          motor.label !== 'Other'
                            ? '7px 0px 0px 0px'
                            : '3px 0px 0px 0px'
                        }
                        colon=': '
                        onIncrement={() => this.handleMotorIncrement(motor)}
                        onDecrement={() => this.handleMotorDecrement(motor)}
                        label={
                          motor.label !== 'Other' ? (
                            motor.label
                          ) : (
                            <span
                              style={{
                                fontFamily: 'Helvetica, Arial',
                                maxWidth: '170px',
                                width: '100px',
                                display: 'inline-block',
                                marginLeft: '10px'
                              }}
                            >
                              <Form.Control
                                autoComplete='off'
                                type='text'
                                placeholder={motor.label}
                                value={motor.motorName}
                                onChange={event =>
                                  this.handleOtherMotor(event, motor)
                                }
                                style={{
                                  fontFamily: 'Helvetica, Arial',
                                  textJustify: 'center',
                                  textAlign: 'center',
                                  fontSize: '90%',
                                  backgroundImage: 'none',
                                  background: 'none',
                                  backgroundSize: '0px'
                                }}
                              />
                            </span>
                          )
                        }
                        disabled={false}
                        dynamic={motor.value == 0}
                        size='xs'
                        marginRight='0px'
                        id={'driveTrainMotor' + motor.id}
                        key={'driveTrainMotor' + motor.id}
                      />
                    </Form.Row>
                  ))}
                </Form.Group>
              </div>
              <div className='div-form'>
                <Form.Group
                  style={{ width: '100%', marginLeft: '2%' }}
                  className='mt-4'
                >
                  {this.state.wheels.map(wheel => (
                    <Form.Row
                      key={'driveTrainWheelRow' + wheel.id}
                      className='mb-2'
                    >
                      <Col xs='4' style={{ textAlign: 'left' }}>
                        <Form.Check
                          isInvalid={
                            this.state.validated &&
                            !this.state.driveTrainWheelsValid &&
                            !this.state.markForFollowUp
                          }
                          isValid={
                            this.state.validated &&
                            this.state.driveTrainWheelsValid &&
                            !this.state.markForFollowUp
                          }
                          onChange={() => this.handleWheelClick(wheel)}
                          custom
                          style={{
                            fontSize: '90%',
                            fontFamily: 'Helvetica, Arial'
                          }}
                          type='checkbox'
                          checked={wheel.value}
                          id={'driveTrainWheel' + wheel.id}
                          key={'driveTrainWheel' + wheel.id}
                          label={
                            wheel.label !== 'Other' ? (
                              wheel.label
                            ) : (
                              <Form.Control
                                autoComplete='off'
                                isInvalid={
                                  this.state.validated &&
                                  wheel.value &&
                                  wheel.wheelName === '' &&
                                  !this.state.markForFollowUp
                                }
                                isValid={
                                  this.state.validated &&
                                  wheel.value &&
                                  wheel.wheelName !== '' &&
                                  !this.state.markForFollowUp
                                }
                                type='text'
                                placeholder={wheel.label}
                                disabled={!wheel.value}
                                onChange={event =>
                                  this.handleOtherWheel(event, wheel)
                                }
                                value={wheel.wheelName}
                                style={{
                                  fontFamily: 'Helvetica, Arial',
                                  maxWidth: '80px',
                                  fontSize: '90%',
                                  backgroundColor: 'transparent'
                                }}
                              />
                            )
                          }
                        />
                      </Col>
                      <Col xs='3' style={{ textAlign: 'center' }}>
                        <Form.Control
                          autoComplete='off'
                          type='number'
                          max={12}
                          min={1}
                          placeholder='Size (in)'
                          isInvalid={
                            this.state.validated &&
                            wheel.value &&
                            wheel.size === '' &&
                            !this.state.markForFollowUp
                          }
                          isValid={
                            this.state.validated &&
                            wheel.value &&
                            wheel.size !== '' &&
                            !this.state.markForFollowUp
                          }
                          disabled={!wheel.value}
                          onChange={event => this.checkWheelSize(event, wheel)}
                          value={wheel.size}
                          style={{
                            fontFamily: 'Helvetica, Arial',
                            fontSize: '65%',
                            textAlign: 'center',
                            marginLeft: '10px',
                            backgroundColor: 'transparent'
                          }}
                        />
                      </Col>
                      <Col>
                        <Counter
                          count={wheel.count}
                          onDecrement={() => this.handleWheelDecrement(wheel)}
                          onIncrement={() => this.handleWheelIncrement(wheel)}
                          colon=''
                          label=''
                          minWidth='24px'
                          maxWidth='24px'
                          margin='0% 0% 0% 20%'
                          disabled={!wheel.value}
                          dynamic={!wheel.value}
                          size='sm'
                          marginRight='0px'
                          key={'driveTrainWheelCounter' + wheel.id}
                        />
                      </Col>
                    </Form.Row>
                  ))}
                </Form.Group>
                <div
                  style={{
                    display: 'inline-block',
                    width: '80%',
                    marginTop: '5px'
                  }}
                >
                  <Form.Group>
                    <Form.Control
                      value={this.state.driveComments}
                      as='textarea'
                      type='text'
                      placeholder='Any additional comments about drive train'
                      onChange={this.handleDriveComment}
                      rows='3'
                      style={{
                        background: 'none',
                        fontFamily: 'Helvetica, Arial'
                      }}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className='div-form'>
                <Form.Group style={{ width: '80%', marginLeft: '1%' }} as={Row}>
                  <Form.Label
                    className='mb-1'
                    style={{
                      fontFamily: 'Helvetica, Arial',
                      fontSize: '110%'
                    }}
                  >
                    Autonomous:
                  </Form.Label>
                </Form.Group>
                <Form.Group
                  style={{ width: '100%', marginLeft: '2%' }}
                  as={Row}
                  className='mb-3'
                >
                  {this.state.programmingLanguages.map(language => (
                    <Form.Check
                      style={{ fontFamily: 'Helvetica, Arial' }}
                      isInvalid={
                        this.state.validated &&
                        this.state.programmingLanguage === '' &&
                        !this.state.markForFollowUp
                      }
                      isValid={
                        this.state.validated &&
                        this.state.programmingLanguage !== '' &&
                        !this.state.markForFollowUp
                      }
                      inline
                      custom
                      label={language.label}
                      type='radio'
                      onChange={() => this.handleProgrammingChange(language)}
                      checked={
                        this.state.programmingLanguage === language.label
                      }
                      id={'language' + language.id}
                      key={'language' + language.id}
                    />
                  ))}
                </Form.Group>
                <Form.Group
                  style={{ width: '100%', marginLeft: '2%' }}
                  as={Row}
                  className='mb-3'
                >
                  {this.state.startingPositions.map(position => (
                    <Form.Check
                      style={{ fontFamily: 'Helvetica, Arial' }}
                      isInvalid={
                        this.state.validated &&
                        this.state.startingPosition === '' &&
                        !this.state.markForFollowUp
                      }
                      isValid={
                        this.state.validated &&
                        this.state.startingPosition !== '' &&
                        !this.state.markForFollowUp
                      }
                      inline
                      custom
                      label={position.label}
                      type='radio'
                      onChange={() => this.handlePositionChange(position)}
                      checked={this.state.startingPosition === position.label}
                      id={'position' + position.id}
                      key={'position' + position.id}
                    />
                  ))}
                </Form.Group>
                <div
                  style={{
                    display: 'inline-block',
                    width: '80%',
                    marginTop: '5px'
                  }}
                >
                  <Form.Group>
                    <Form.Control
                      value={this.state.autoComments}
                      as='textarea'
                      type='text'
                      onChange={this.handleAutoComment}
                      placeholder='What is their usual strategy in auto?'
                      className='mb-0'
                      rows='3'
                      style={{
                        background: 'none',
                        fontFamily: 'Helvetica, Arial'
                      }}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className='div-form'>
                <Form.Group style={{ width: '80%', marginLeft: '1%' }} as={Row}>
                  <Form.Label
                    style={{
                      fontFamily: 'Helvetica, Arial',
                      fontSize: '110%'
                    }}
                  >
                    Abilities:
                  </Form.Label>
                </Form.Group>
                <Form.Group style={{ width: '100%', marginLeft: '2%' }}>
                  {this.state.mechanisms.map(mechanism => (
                    <Form.Row
                      key={'mechanismRow' + mechanism.id}
                      className='mb-2'
                    >
                      <Form.Check
                        isInvalid={
                          this.state.validated &&
                          !this.state.mechanismsValid &&
                          !this.state.markForFollowUp
                        }
                        isValid={
                          this.state.validated &&
                          this.state.mechanismsValid &&
                          !this.state.markForFollowUp
                        }
                        onChange={() => this.handleMechanismClick(mechanism)}
                        custom
                        style={{
                          fontSize: '90%',
                          fontFamily: 'Helvetica, Arial'
                        }}
                        label={mechanism.label}
                        type='checkbox'
                        checked={mechanism.value}
                        id={'mechanism' + mechanism.id}
                        key={'mechanism' + mechanism.id}
                      />
                    </Form.Row>
                  ))}
                </Form.Group>
              </div>
              <div className='div-form'>
                <Form.Group style={{ width: '80%', marginLeft: '1%' }} as={Row}>
                  <Form.Label
                    style={{
                      fontFamily: 'Helvetica, Arial',
                      fontSize: '110%'
                    }}
                  >
                    Closing:
                  </Form.Label>
                </Form.Group>
                <div
                  style={{
                    display: 'inline-block',
                    width: '80%',
                    marginTop: '5px'
                  }}
                >
                  <Form.Group>
                    <Form.Control
                      value={this.state.workingOnComments}
                      as='textarea'
                      type='text'
                      placeholder='Is there anything that the team is still working on?'
                      onChange={this.handleWorkingOnComment}
                      className='mb-0'
                      rows='3'
                      style={{
                        background: 'none',
                        fontFamily: 'Helvetica, Arial'
                      }}
                    />
                  </Form.Group>
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    width: '80%',
                    marginTop: '5px'
                  }}
                >
                  <Form.Group>
                    <Form.Control
                      value={this.state.closingComments}
                      as='textarea'
                      type='text'
                      placeholder='Additional comments'
                      onChange={this.handleClosingComment}
                      className='mb-0'
                      rows='2'
                      style={{
                        background: 'none',
                        fontFamily: 'Helvetica, Arial'
                      }}
                    />
                  </Form.Group>
                </div>
                <div>
                  <Button
                    variant='success'
                    type='btn'
                    style={{
                      fontFamily: 'Helvetica, Arial',
                      boxShadow:
                        '-3px 3px black, -2px 2px black, -1px 1px black',
                      border: '1px solid black'
                    }}
                    onClick={this.handleCameraActivation}
                    className='btn-xs mb-3'
                  >
                    {this.state.cameraActivated
                      ? 'Close Camera'
                      : 'Open Camera'}
                  </Button>
                </div>
                {this.state.dataUri === '' ? null : (
                  <ImagePreview
                    dataUri={this.state.dataUri}
                    isFullscreen={false}
                  />
                )}
                <Form.Check
                  onChange={this.handleFollowUp}
                  checked={this.state.markForFollowUp}
                  custom
                  style={{
                    fontSize: '100%',
                    fontFamily: 'Helvetica, Arial'
                  }}
                  type='checkbox'
                  label='Mark for follow up'
                  id='followUp'
                />
              </div>
              <Button
                variant='success'
                type='btn'
                style={{
                  fontFamily: 'Helvetica, Arial',
                  boxShadow: '-3px 3px black, -2px 2px black, -1px 1px black',
                  border: '1px solid black'
                }}
                onClick={this.handleSumbit}
                className='btn-lg'
              >
                Submit form
              </Button>
            </div>
          </div>
        );
      }
    }
  }
}

export default PitContent;
