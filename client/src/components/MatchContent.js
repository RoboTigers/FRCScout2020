import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


class MatchContent extends Component {

  state = {
    matchData: {}
  }

  componentDidMount() {
    console.log("Entered match content");
    console.log(this.props);
    console.log(this.props.match.params.matchId);
    fetch(`/api/matches/${this.props.match.params.matchId}`)
    .then(response => response.json())
    .then(data => {
      //should only be 1 row but let's be safe
      data.matchList.map(m => {
        this.setState({ matchData: m });
      });
      console.log('Success:', data);
      console.log(this.state.matchData);
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("Handing: ", this.state.matchData)
    const data = {
      matchId: this.state.matchData.matchid,
      matchNum: document.getElementById("formMatchNum").value
    };
    console.log("content data: ", data);

    fetch("/api/match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        console.log("Success:", data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  render() {

    return (      
      <Form onSubmit={this.handleSubmit} className="match-form">

        <div>{this.state.matchData.shortname}</div>

        <Form.Group as={Row} controlId="formTeamNum">
          <Form.Label column xs="2">
            Team Number
          </Form.Label>
          <Col xs="9">
            <Form.Control type="number" defaultValue={this.state.matchData.teamnum} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formMatchNum">
          <Form.Label column xs="2">
            Match Number
          </Form.Label>
          <Col xs="9">
            <Form.Control type="text" defaultValue={this.state.matchData.matchnum} />
          </Col>
        </Form.Group>

        <Button type="submit" className="btn-lg">
          Done
        </Button>
      </Form>
    );
  }
}

export default MatchContent;
