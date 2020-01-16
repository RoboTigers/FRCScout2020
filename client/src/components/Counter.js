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
    fontSize: "90%",
    // display: "inline-block",
    margin: this.props.margin,
    minWidth: this.props.minWidth
    // textAlign: "center"
    // justifyContent: "center"
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
        <span style={this.spanStyle}>
          {"  "}
          {this.props.label}
          {this.props.colon} {this.state.count}{" "}
        </span>
        <Button
          style={{
            marginRight: this.props.marginRight
          }}
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
