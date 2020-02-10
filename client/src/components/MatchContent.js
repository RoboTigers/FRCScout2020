import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from './1796NumberswithScratch.png';
import AllianceStation from './AllianceStationGuide.png';
import Counter from './Counter.js';
import StopWatch from './StopWatch.js';

class MatchContent extends Component {
  state = {
    retrieved: 'retrieved',
    markForFollowUp: false,
    formStage: 2,
    validatedStage0: false,
    validatedStage1: false,
    widthSzie: '',
    heightSize: '',
    scout: '',
    matchNum: '',
    allianceStation: 'Red Station 1',
    autoTeam: true,
    teamNum: '',
    autoPowerCells: 0,
    startingPositions: [
      { id: 1, label: 'Left' },
      { id: 2, label: 'Center' },
      { id: 3, label: 'Right' }
    ],
    startingPosition: '',
    crossLineOptions: [
      { id: 1, label: 'Yes' },
      { id: 2, label: 'No' }
    ],
    crossLine: '',
    autoScored: [
      { id: 1, label: 'Bottom', value: 0, min: 0, max: 12 },
      { id: 2, label: 'Outer', value: 0, min: 0, max: 12 },
      { id: 3, label: 'Inner', value: 0, min: 0, max: 12 }
    ],
    autoComments: ''
  };

  componentDidMount() {
    // console.log('Entered match content');
    // console.log(this.props);
    // console.log(this.props.match.params.matchId);
    // fetch(`/api/matches/${this.props.match.params.matchId}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     //should only be 1 row but let's be safe
    //     data.matchList.map(m => {
    //       this.setState({ matchData: m });
    //     });
    //     console.log('Success:', data);
    //     console.log(this.state.matchData);
    //   });
    this.setState({
      widthSize: window.innerWidth <= 760 ? '90%' : '50%'
    });
    this.setState({ heightSize: window.innerHeight + 'px' });
  }

  handleMatchNum = event => {
    this.setState({ matchNum: event.target.value });
  };

  handleStationChange = event => {
    this.setState({ allianceStation: event.target.value });
  };

  handleModeSwitch = event => {
    this.setState({ autoTeam: !this.state.autoTeam });
  };

  handleTeamNum = event => {
    this.setState({ teamNum: event.target.value });
  };

  handleStage0Increment = event => {
    this.setState({ validatedStage0: true });
    if (this.state.matchNum !== '' && this.state.teamNum !== '') {
      this.setState({ formStage: 1 });
    }
  };

  handleSliderAutoCells = event => {
    this.setState({ autoPowerCells: event.target.value });
  };

  handlePositionChange = position => {
    this.setState({ startingPosition: position.label });
  };

  handleCrossLineChange = option => {
    this.setState({ crossLine: option.label });
  };

  handleAutoGoalIncrement = goal => {
    const autoGoals = [...this.state.autoScored];
    const index = autoGoals.indexOf(goal);
    autoGoals[index] = { ...goal };
    if (autoGoals[index].value === autoGoals[index].max) {
    } else {
      autoGoals[index].value = autoGoals[index].value + 1;
    }
    this.setState({ autoScored: autoGoals });
  };

  handleAutoGoalDecrement = goal => {
    const autoGoals = [...this.state.autoScored];
    const index = autoGoals.indexOf(goal);
    autoGoals[index] = { ...goal };
    if (autoGoals[index].value === autoGoals[index].min) {
    } else {
      autoGoals[index].value = autoGoals[index].value - 1;
    }
    this.setState({ autoScored: autoGoals });
  };

  handleAutoComment = event => {
    this.setState({ autoComments: event.target.value });
  };

  handleStage1Increment = event => {
    this.setState({ validatedStage1: true });
    if (this.state.startingPosition !== '' && this.state.crossLine !== '') {
      this.setState({ formStage: 2 });
    }
  };

  handleStage1Decrement = event => {
    this.setState({ formStage: 0 });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('Handing: ', this.state.matchData);
    const data = {
      matchId: this.state.matchData.matchid,
      matchNum: document.getElementById('formMatchNum').value
    };
    console.log('content data: ', data);

    fetch('/api/match', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  render() {
    if (this.state.retrieved === '') {
      return null;
    } else if (this.state.retrieved === 'invalid') {
      return (
        <div className='div-main'>
          <h1 className='pt-4'>Invalid match form request</h1>
        </div>
      );
    } else {
      if (this.state.formStage === 0) {
        return (
          <div
            className='div-main'
            style={{ minHeight: this.state.heightSize }}
          >
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
                    Scouter: {this.state.scout}
                  </Form.Label>
                </Form.Group>
                <Form.Group style={{ width: '80%', marginLeft: '1%' }} as={Row}>
                  <Form.Label
                    className='mb-1'
                    style={{
                      fontFamily: 'Helvetica, Arial',
                      fontSize: '110%'
                    }}
                  >
                    Match Number:
                  </Form.Label>
                </Form.Group>
                <Form.Group style={{ width: '80%', marginLeft: '2%' }} as={Row}>
                  <Form.Control
                    value={this.state.matchNum}
                    autoComplete='off'
                    type='number'
                    max={200}
                    min={1}
                    placeholder='Match Number'
                    onChange={this.handleMatchNum}
                    isValid={
                      this.state.validatedStage0 && this.state.matchNum !== ''
                    }
                    isInvalid={
                      this.state.validatedStage0 && this.state.matchNum === ''
                    }
                    className='mb-1'
                    style={{
                      background: 'none',
                      fontFamily: 'Helvetica, Arial'
                    }}
                  />
                </Form.Group>
                <Form.Group style={{ width: '80%', marginLeft: '1%' }} as={Row}>
                  <Form.Label
                    className='mb-1'
                    style={{
                      fontFamily: 'Helvetica, Arial',
                      fontSize: '110%'
                    }}
                  >
                    Alliance Station:
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
                    onChange={this.handleStationChange}
                    value={this.state.allianceStation}
                  >
                    <option>Red Station 1</option>
                    <option>Red Station 2</option>
                    <option>Red Station 3</option>
                    <option>Blue Station 1</option>
                    <option>Blue Station 2</option>
                    <option>Blue Station 3</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group style={{ width: '80%', marginLeft: '1%' }} as={Row}>
                  <Form.Label
                    className='mb-1'
                    style={{
                      fontFamily: 'Helvetica, Arial',
                      fontSize: '110%'
                    }}
                  >
                    Team Number:
                  </Form.Label>
                </Form.Group>
                <Form.Group style={{ width: '80%', marginLeft: '2%' }} as={Row}>
                  <Form.Check
                    value={this.state.autoTeam}
                    onChange={this.handleModeSwitch}
                    type='switch'
                    label={this.state.autoTeam ? 'Automatic' : 'Manual'}
                    id='switchMode'
                    style={{ fontFamily: 'Helvetica, Arial', fontSize: '110%' }}
                  />
                </Form.Group>
                <Form.Group style={{ width: '80%', marginLeft: '2%' }} as={Row}>
                  {this.state.autoTeam ? (
                    <Form.Label
                      className='mb-1'
                      style={{
                        fontFamily: 'Helvetica, Arial',
                        fontSize: '110%'
                      }}
                    >
                      {this.state.teamNum}
                    </Form.Label>
                  ) : (
                    <Form.Control
                      value={this.state.teamNum}
                      autoComplete='off'
                      type='number'
                      max={9999}
                      min={1}
                      placeholder='Team Number'
                      onChange={this.handleTeamNum}
                      isValid={
                        this.state.validatedStage0 && this.state.teamNum !== ''
                      }
                      isInvalid={
                        this.state.validatedStage0 && this.state.teamNum === ''
                      }
                      className='mb-1'
                      style={{
                        background: 'none',
                        fontFamily: 'Helvetica, Arial'
                      }}
                    />
                  )}
                </Form.Group>
              </div>
              <Button
                variant='success'
                type='btn'
                style={{
                  fontFamily: 'Helvetica, Arial',
                  boxShadow: '-3px 3px black, -2px 2px black, -1px 1px black',
                  border: '1px solid black'
                }}
                onClick={this.handleStage0Increment}
                className='btn-lg'
              >
                Next
              </Button>
            </div>
          </div>
        );
      } else if (this.state.formStage === 1) {
        return (
          <div
            className='div-main'
            style={{ minHeight: this.state.heightSize }}
          >
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
                    className='mb-1'
                    style={{
                      fontFamily: 'Helvetica, Arial',
                      fontSize: '110%'
                    }}
                  >
                    {'Pre-Loaded Power Cells: ' + this.state.autoPowerCells}
                  </Form.Label>
                </Form.Group>
                <input
                  min={0}
                  max={3}
                  step={1}
                  className='slider'
                  value={this.state.autoPowerCells}
                  onChange={this.handleSliderAutoCells}
                  type='range'
                  id='autoPowerCellSlider'
                />
              </div>
              <div className='div-form'>
                <img
                  alt='Guide'
                  src={AllianceStation}
                  style={{
                    width: '100%',
                    marginTop: '20px',
                    marginBottom: '20px'
                  }}
                />
                <Form.Group style={{ width: '80%', marginLeft: '1%' }} as={Row}>
                  <Form.Label
                    className='mb-1'
                    style={{
                      fontFamily: 'Helvetica, Arial',
                      fontSize: '110%'
                    }}
                  >
                    Starting Position:
                  </Form.Label>
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
                        this.state.validatedStage1 &&
                        this.state.startingPosition === ''
                      }
                      isValid={
                        this.state.validatedStage1 &&
                        this.state.startingPosition !== ''
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
              </div>
              <div className='div-form'>
                <Form.Group style={{ width: '80%', marginLeft: '1%' }} as={Row}>
                  <Form.Label
                    className='mb-1'
                    style={{
                      fontFamily: 'Helvetica, Arial',
                      fontSize: '110%',
                      textAlign: 'left'
                    }}
                  >
                    Did the robot cross the initiation line?
                  </Form.Label>
                </Form.Group>
                <Form.Group
                  style={{ width: '100%', marginLeft: '2%' }}
                  as={Row}
                  className='mb-3'
                >
                  {this.state.crossLineOptions.map(option => (
                    <Form.Check
                      style={{ fontFamily: 'Helvetica, Arial' }}
                      isInvalid={
                        this.state.validatedStage1 &&
                        this.state.crossLine === ''
                      }
                      isValid={
                        this.state.validatedStage1 &&
                        this.state.crossLine !== ''
                      }
                      inline
                      custom
                      label={option.label}
                      type='radio'
                      onChange={() => this.handleCrossLineChange(option)}
                      checked={this.state.crossLine === option.label}
                      id={'cross' + option.id}
                      key={'cross' + option.id}
                    />
                  ))}
                </Form.Group>
              </div>
              <div className='div-form'>
                <Form.Group style={{ width: '80%', marginLeft: '1%' }} as={Row}>
                  <Form.Label
                    className='mb-1'
                    style={{
                      fontFamily: 'Helvetica, Arial',
                      fontSize: '110%',
                      textAlign: 'left'
                    }}
                  >
                    Power Cells Scored in Auto:
                  </Form.Label>
                </Form.Group>
                <Form.Group style={{ width: '100%' }}>
                  {this.state.autoScored.map(goal => (
                    <Form.Row
                      className='mb-2 justify-content-center'
                      key={'autoGoalRow' + goal.id}
                    >
                      <Counter
                        minWidth='170px'
                        count={goal.value}
                        margin={'3px 0px 0px 0px'}
                        colon=': '
                        onIncrement={() => this.handleAutoGoalIncrement(goal)}
                        onDecrement={() => this.handleAutoGoalDecrement(goal)}
                        label={goal.label}
                        disabled={false}
                        dynamic={goal.value === 0}
                        size='xs'
                        marginRight='0px'
                        id={'autoGoal' + goal.id}
                        key={'autoGoal' + goal.id}
                      />
                    </Form.Row>
                  ))}
                </Form.Group>
              </div>
              <div className='div-form'>
                <Form.Group style={{ width: '80%', marginLeft: '1%' }} as={Row}>
                  <Form.Label
                    className='mb-1'
                    style={{
                      fontFamily: 'Helvetica, Arial',
                      fontSize: '110%',
                      textAlign: 'left'
                    }}
                  >
                    Auto Comments:
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
                      value={this.state.autoComments}
                      as='textarea'
                      type='text'
                      placeholder='Comments concerning auto'
                      onChange={this.handleAutoComment}
                      rows='3'
                      style={{
                        background: 'none',
                        fontFamily: 'Helvetica, Arial'
                      }}
                    />
                  </Form.Group>
                </div>
              </div>
              <Button
                variant='success'
                type='btn'
                style={{
                  fontFamily: 'Helvetica, Arial',
                  boxShadow: '-3px 3px black, -2px 2px black, -1px 1px black',
                  border: '1px solid black',
                  marginRight: '15%'
                }}
                onClick={this.handleStage1Decrement}
                className='btn-lg'
              >
                Back
              </Button>
              <Button
                variant='success'
                type='btn'
                style={{
                  fontFamily: 'Helvetica, Arial',
                  boxShadow: '-3px 3px black, -2px 2px black, -1px 1px black',
                  border: '1px solid black'
                }}
                onClick={this.handleStage1Increment}
                className='btn-lg'
              >
                Next
              </Button>
            </div>
          </div>
        );
      } else if (this.state.formStage === 2) {
        return (
          <div
            className='div-main'
            style={{ minHeight: this.state.heightSize }}
          >
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
                <StopWatch></StopWatch>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

export default MatchContent;
