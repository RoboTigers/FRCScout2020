import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class Counter extends Component {
  state = {
    count: 0
  };

  // change code below this line

  increment = event => {
    this.setState({
      count: this.state.count + 1
    });
  };

  decrement = event => {
    this.setState({
      count: this.state.count - 1
    });
  };

  spanStyle = {
    fontSize: "15px",
    display: "inline-block",
    minWidth: "200px"
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
