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

  //   getBadgeClasses() {
  //     let classes = "mr-4";
  //     classes += this.props.label === "Drive Train Motors:" ? "" : " mb-3";
  //     return classes;
  //   }

  // change code above this line
  render() {
    return (
      <div className="">
        <Button className="btn btn-danger btn-xs" onClick={this.decrement}>
          -
        </Button>
        <span style={{ fontSize: 15 }}>
          {" "}
          {this.props.label} {this.state.count}{" "}
        </span>
        <Button className="btn btn-success btn-xs" onClick={this.increment}>
          +
        </Button>
      </div>
    );
  }
}

export default Counter;
