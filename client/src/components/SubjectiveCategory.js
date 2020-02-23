import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class SubjectiveCategory extends Component {
  state = {
    inputs: [
        {title: "3 (Best)", name: "3"},
        {title: "2 (Medium)", name: "2"},
        {title: "1 (Worst)", name: "1"},
        {title: "0 (None)", name: "0"}
    ]
  };

  //TODO: Populate dropdown with the 3 alliance teams from match table, for now hard wired dummy data
  //TODO: Get any existing ranking data from database for the team play and pre-populate dropdowns
  generateRankingGroups = () => {
    let parent = [];
    this.state.inputs.map(input => {
        parent.push(
            <Form.Group style={{ width: '80%', marginLeft: '10%' }} as={Row}>
            <Col xs='4' style={{ textAlign: 'left' }}>
            <Form.Label
            style={{
                fontFamily: 'Helvetica, Arial',
                fontSize: '110%'
            }}
            >{input.title}</Form.Label>
            </Col>
            <Col xs='3'>
            <Form.Control
            style={{
                background: 'none',
                fontFamily: 'Helvetica, Arial'
            }}
            name={input.name}
            as='select'
            onChange={this.handleCategoryRankingChange}
            >
            <option></option>
            <option>Team 1</option>
            <option>Team 2</option>
            <option>Team 3</option>
            </Form.Control>
            </Col>
        </Form.Group>
        );
    });
    return parent;
  }

  render() {

    return (

        <div>
      
        <Form.Group style={{ width: '20%', marginLeft: '10%' }} as={Row}>
            <Form.Label
            className='mb-1'
            style={{
                fontFamily: 'Helvetica, Arial',
                fontSize: '110%'
            }}
            >
            {this.props.name}
            </Form.Label>
        </Form.Group>

        {this.generateRankingGroups()}

        </div>

    );
  }
}

export default SubjectiveCategory;
