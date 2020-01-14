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
    minWidth: "170px"
  };

  render() {
    return (
      <div>
        <Button className="btn btn-danger btn-xs" onClick={this.decrement}>
          -
        </Button>
        <div className="" style={this.spanStyle}>
          {"  "}
          {this.props.label} {this.state.count}{" "}
        </div>
        <Button className="btn btn-success btn-xs " onClick={this.increment}>
          +
        </Button>
      </div>
    );
  }
}

export default Counter;
