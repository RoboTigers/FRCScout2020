import React, { Component } from "react";
import "./PitContent.css";
import Logo from "./1796NumberswithScratch.png";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

class PitNavigation extends Component {
  state = {
    validated: false,
    widthSize: "",
    heightSize: "",
    competition: "",
    tableData: {}
  };

  componentDidMount() {
    fetch("/pitNav")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ Tabledata: data });
      })
      .catch(error => {
        console.error("Error:", error);
      });
    this.setState({
      widthSize: window.innerWidth <= 760 ? "90%" : "50%"
    });
    this.setState({ heightSize: window.innerHeight + "px" });
  }

  handleRefresh = () => {};

  render() {
    return (
      <div className="div-main">
        <div className="justify-content-center">
          <img
            alt="Logo"
            src={Logo}
            style={{
              width: this.state.widthSize === "90%" ? "70%" : "30%",
              marginTop: "20px",
              marginLeft: "10px"
            }}
          />
        </div>
        <div style={{ width: this.state.widthSize }} className="div-second">
          <div className="pit-form">
            <div className="div-form">
              <Form.Group style={{ width: "80%", marginLeft: "1%" }} as={Row}>
                <Form.Label
                  className="mb-1"
                  style={{
                    fontFamily: "Helvetica, Arial",
                    fontSize: "110%"
                  }}
                >
                  Competition:
                </Form.Label>
              </Form.Group>
              <Form.Group
                controlId="formCompetition"
                style={{ width: "80%", marginLeft: "2%" }}
                as={Row}
              >
                <Form.Control
                  style={{
                    background: "none",
                    fontFamily: "Helvetica, Arial"
                  }}
                  className="mb-1"
                  as="select"
                  onChange={this.handleGroupChange}
                ></Form.Control>
              </Form.Group>
              <Button
                type="btn"
                onClick={this.handleRefresh}
                className="btn-lg"
                style={{ fontFamily: "Helvetica, Arial" }}
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>
        {/* <Table striped bordered hover>
          <thead>
            <th>Team Number</th>
            <th>Team Name</th>
            <th>Status</th>
            <th>Scout</th>
          </thead>
          <tbody></tbody>
        </Table> */}
      </div>
    );
  }
}

export default PitNavigation;
