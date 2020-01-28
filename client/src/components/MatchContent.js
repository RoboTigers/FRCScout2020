import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';


class MatchContent extends Component {

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      competition: document.getElementById("formCompetition").value,
      teamNum: document.getElementById("formTeamNum").value,
      matchNum: document.getElementById("formMatchNum").value
    };

    fetch("/match", {
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
    const matches = [
      {name: 'jonMatch', id: 123},
      {name: 'SharonMatch', id: 124},
      {name: 'FonMatch', id: 125},
      {name: 'GonMatch', id: 126},
      {name: 'HonMatch', id: 127}
    ];

    const listItems = matches.map((match) =>
        <li key={match.id}>
              <Link to={`/matches/${match.id}`}>{match.name}</Link>
        </li>
    );

    return (      
      <Form onSubmit={this.handleSubmit} className="match-form">
        <ul>{listItems}</ul>

        <Form.Group className="mt-3" as={Row} controlId="formCompetition">
          <Form.Label column xs="2"></Form.Label>
          <Col xs="6">
            <Form.Control as="select">
              <option>HVR</option>
              <option>SBPLI</option>
              <option>NYC</option>
              <option>Champs</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formTeamNum">
          <Form.Label column xs="2">
            Team Number
          </Form.Label>
          <Col xs="9">
            <Form.Control type="number" placeholder="Team Number" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formMatchNum">
          <Form.Label column xs="2">
            Match Number
          </Form.Label>
          <Col xs="9">
            <Form.Control type="text" placeholder="Match Number" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formAuto">
          <Form.Label column xs="2">
            Auto
          </Form.Label>
          <Col xs="1">
            <Form.Check custom="true" type="switch" label="" />
          </Col>
        </Form.Group>

        <Button type="submit" className="btn-lg">
          Submit form
        </Button>
      </Form>
    );
  }
}

export default MatchContent;
