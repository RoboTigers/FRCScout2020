import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

var time = 0;

class StopWatch extends Component {
  state = {
    timeLabel: '00:00:00',
    stateRunning: false
  };

  startPause = event => {
    if (this.state.stateRunning === false) {
      this.setState({ stateRunning: true }, () => {
        this.increment();
      });
    } else {
      this.setState({ stateRunning: false });
    }
  };

  increment() {
    if (this.state.stateRunning) {
      setTimeout(
        function() {
          time++;
          var mins = Math.floor(time / 6000);
          var secs = Math.floor(time / 10);
          var tenth = time % 100;
          if (mins < 10) {
            mins = '0' + mins;
          }
          if (secs < 10) {
            secs = '0' + secs;
          }
          if (tenth < 10) {
            tenth = '0' + tenth;
          }
          this.setState({ timeLabel: mins + ':' + secs + ':' + tenth });
          this.increment();
        }.bind(this),
        100
      );
    }
  }

  restart = event => {
    this.setState({ stateRunning: false }, () => {
      time = 0;
      this.setState({ timeLabel: '00:00:00' });
    });
  };

  render() {
    return (
      <div>
        <nav>
          <Button
            variant={this.state.stateRunning ? 'danger' : 'success'}
            type='btn'
            style={{
              fontFamily: 'Helvetica, Arial',
              boxShadow: '-3px 3px black, -2px 2px black, -1px 1px black',
              border: '1px solid black',
              marginRight: '5%'
            }}
            onClick={this.startPause}
            className='btn-sm'
          >
            {this.state.stateRunning ? 'Pause' : 'Start'}
          </Button>
          <Button
            variant='danger'
            type='btn'
            style={{
              fontFamily: 'Helvetica, Arial',
              boxShadow: '-3px 3px black, -2px 2px black, -1px 1px black',
              border: '1px solid black'
            }}
            onClick={this.restart}
            className='btn-sm'
          >
            Restart
          </Button>
        </nav>
        <span>{this.state.timeLabel}</span>
      </div>
    );
  }
}

export default StopWatch;
