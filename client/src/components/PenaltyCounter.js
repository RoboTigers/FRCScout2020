import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class PenaltyCounter extends Component {
  state = {
    minWidth: ''
  };

  spanStyle = {
    fontSize: '100%',
    display: 'inline-block',
    minWidth: this.props.minWidth,
    maxWidth: this.props.maxWidth,
    fontFamily: 'Helvetica, Arial',
    marginTop: '5%',
    marginBottom: '5%'
    // textAlign: "center"
    // justifyContent: "center"
  };

  refCallback = element => {
    if (element) {
      this.setState({ minWidth: element.getBoundingClientRect().width });
    }
  };

  render() {
    return (
      <span style={{ margin: this.props.margin }}>
        <Button
          disabled={this.props.disabled}
          className='btn'
          variant={this.props.dynamic ? 'outline-danger' : 'danger'}
          onClick={this.props.onDecrement}
          size={this.props.size}
          style={{
            fontSize: '100%',
            minWidth: this.state.minWidth,
            marginRight: '15%'
          }}
        >
          -3
        </Button>
        <Button
          disabled={this.props.disabled}
          className='btn'
          variant={this.props.dynamic ? 'outline-danger' : 'danger'}
          onClick={this.props.onDecrementLarger}
          size={this.props.size}
          style={{
            fontSize: '100%',
            minWidth: this.state.minWidth
          }}
        >
          -15
        </Button>
        <div>
          <span style={this.spanStyle}>
            {this.props.label}
            {this.props.colon}
            {this.props.count}
          </span>
        </div>
        <Button
          style={{
            // marginRight: this.props.marginRight,
            fontSize: '100%',
            minWidth: this.state.minWidth
          }}
          disabled={this.props.disabled}
          className='btn'
          variant={this.props.dynamic ? 'outline-success' : 'success'}
          onClick={this.props.onIncrement}
          size={this.props.size}
        >
          +3
        </Button>
        <Button
          ref={this.refCallback}
          style={{
            // marginRight: this.props.marginRight,
            marginLeft: '15%',
            fontSize: '100%',
            minWidth: this.state.minWidth
          }}
          disabled={this.props.disabled}
          className='btn'
          variant={this.props.dynamic ? 'outline-success' : 'success'}
          onClick={this.props.onIncrementLarger}
          size={this.props.size}
        >
          +15
        </Button>
      </span>
    );
  }
}

export default PenaltyCounter;
