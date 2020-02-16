import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Stopwatch extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    minWidth: ''
  };

  startTimer = () => {
    if (this.state.timerOn === false) {
      this.setState({
        timerOn: true,
        timerTime: this.state.timerTime,
        timerStart: Date.now() - this.state.timerTime
      });
      this.timer = setInterval(() => {
        this.props.parentCallback(Date.now() - this.state.timerStart);
        this.setState({
          timerTime: Date.now() - this.state.timerStart
        });
      }, 10);
    } else {
      this.setState({ timerOn: false });
      clearInterval(this.timer);
    }
  };

  resetTimer = () => {
    this.setState({
      timerOn: false,
      timerStart: 0,
      timerTime: 0
    });
    clearInterval(this.timer);
    this.props.parentCallback(0);
  };

  refCallback = element => {
    if (element) {
      this.setState({ minWidth: element.getBoundingClientRect().width });
    }
  };

  render() {
    const { timerTime } = this.state;
    let centiseconds = ('0' + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ('0' + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ('0' + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    return (
      <div className='mb-3' style={{ textAlign: 'center', margin: '0 auto' }}>
        <div
          style={{
            fontFamily: 'Helvetica, Arial',
            fontSize: '150%',
            display: 'inline-block',
            textAlign: 'center'
          }}
        >
          {minutes}:{seconds}:{centiseconds}
        </div>
        <div>
          <Button
            variant={this.state.timerOn ? 'danger' : 'success'}
            type='btn'
            style={{
              textAlign: 'center',
              minWidth: this.state.minWidth,
              maxWidth: this.state.minWidth,
              fontFamily: 'Helvetica, Arial',
              boxShadow: '-3px 3px black, -2px 2px black, -1px 1px black',
              border: '1px solid black',
              margin: '0 4% 0 0',
              fontSize: '120%'
            }}
            onClick={this.startTimer}
            className='btn-sm'
          >
            {this.state.timerOn ? 'Stop' : 'Start'}
          </Button>
          <Button
            ref={this.refCallback}
            variant='danger'
            type='btn'
            style={{
              fontFamily: 'Helvetica, Arial',
              boxShadow: '-3px 3px black, -2px 2px black, -1px 1px black',
              border: '1px solid black',
              fontSize: '120%',
              margin: '0 0 0 4%'
            }}
            onClick={this.resetTimer}
            className='btn-sm'
          >
            Reset
          </Button>
        </div>
      </div>
    );
  }
}

export default Stopwatch;
