import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class Counter extends Component {
  state = {
    count: 0
  };

  // change code below this line

  increment = event => {
    if (this.state.count === this.props.max) {
    } else {
      this.setState({
        count: this.state.count + 1
      });
    }
  };

  decrement = event => {
    if (this.state.count === this.props.min) {
    } else {
      this.setState({
        count: this.state.count - 1
      });
    }
  };

  spanStyle = {
    fontSize: "105%",
    display: "inline-block",
    minWidth: this.props.minWidth
  };

  render() {
    return (
      <React.Fragment>
        <Button
          disabled={this.props.disabled}
          className="btn btn-danger"
          onClick={this.decrement}
          size={this.props.size}
        >
          -
        </Button>
        <div style={this.spanStyle}>
          {"  "}
          {this.props.label} {this.state.count}{" "}
        </div>
        <Button
          style={{ marginRight: this.props.marginRight }}
          disabled={this.props.disabled}
          className="btn btn-success"
          onClick={this.increment}
          size={this.props.size}
        >
          +
        </Button>
      </React.Fragment>
    );
  }
}

export default Counter;
