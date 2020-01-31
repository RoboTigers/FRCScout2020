import React, { Component } from 'react';
import { Form, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';

class MatchReportList extends Component {
  state = {
    competition: '',
    competitions: [],
    matches: [],
    columns: [{}]
  };

  getMatchReportListForCompetition = competition => {
    this.setState({
      competition: competition
    });
    fetch(`/api/competitions/${competition}/matches`)
      .then(response => response.json())
      .then(data => {
        console.log('DATA', data);
        this.setState({
          matches: data.matchList
        });
        this.setState({
          columns: this.getMatchFields()
        });
      });
  };

  componentDidMount() {
    fetch('/competitions')
      .then(response => response.json())
      .then(data => {
        this.setState({ competitions: data.competitions });
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    // Default the table to some competition TODO: Use database current competition flag
    // fetch(`/api/competitions/HVR/matches`)
    //   .then(response => response.json())
    //   .then(data => {
    //     // this.state.matches = data.matchList;
    //     this.setState({matches: data.matchList})
    //     this.getMatchFields()
    //     console.log("DATA", this.state.matches);

    // })
  }

  getMatchFields() {
    if (this.state.matches.length === 0) return [];
    let columns = Object.keys(this.state.matches[0]).map(key => {
      return {
        dataField: key,
        text: key.toUpperCase()
      };
    });
    console.log('COLUMNS ARE', columns);
    return columns;
  }

  render() {
    const matchItems = this.state.matches.map(match => (
      <li key={match.id}>
        <Link to={`/matches/${match.matchid}`}>{match.teamnum}</Link>
      </li>
    ));

    const competitionItems = this.state.competitions.map(competition => (
      <Dropdown.Item
        eventKey={competition.shortname}
        value={competition.competitionid}
      >
        {competition.shortname}
      </Dropdown.Item>
    ));

    return (
      <Form onSubmit={this.handleSubmit} className='matches-form'>
        <ul>{matchItems}</ul>

        <Dropdown
          focusFirstItemOnShow={true}
          onSelect={this.getMatchReportListForCompetition}
        >
          <Dropdown.Toggle variant='success' id='dropdown-basic'>
            {this.state.competition || 'Select One'}
          </Dropdown.Toggle>
          <Dropdown.Menu>{competitionItems}</Dropdown.Menu>
        </Dropdown>

        <div>
          <BootstrapTable
            stripped
            hover
            keyField='matchid'
            //rowStyle={this.state.style}
            bordered
            bootstrap4
            data={this.state.matches}
            columns={this.state.columns}
          />
        </div>

        <Dropdown
          focusFirstItemOnShow={true}
          onSelect={this.getMatchReportListForCompetition}
        >
          <Dropdown.Toggle variant='success' id='dropdown-basic'>
            {this.state.competition || 'Select One'}
          </Dropdown.Toggle>

          <Dropdown.Menu>{competitionItems}</Dropdown.Menu>
        </Dropdown>
      </Form>
    );
  }
}

export default MatchReportList;
