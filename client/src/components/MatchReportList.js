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
    // Chain the fetches to ensure sync so that we have is_current competiton
    // before querying for matches in that competition.
    fetch('/competitions')
      .then(response => response.json())
      .then(data => {
        this.setState({ competitions: data.competitions });
        data.competitions.map(c => {
          if (c.iscurrent) {
            this.setState({ competition: c.shortname });
          }
        });
        console.log('Success:', data);
      })
      .then(() => {
        fetch(`/api/competitions/${this.state.competition}/matches`)
          .then(response => response.json())
          .then(data => {
            this.setState({ matches: data.matchList });
            this.setState({ columns: this.getMatchFields() });
          });
      })

      .catch(error => {
        console.error('Error:', error);
      });
  }

  getMatchFields() {
    return [
      { dataField: 'teamnum', text: 'Team' },
      { dataField: 'matchnum', text: 'Match' },
      { dataField: 'scoutname', text: 'Scout' },
      { dataField: 'reportstatus', text: 'Status' }
    ];
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

    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        console.log(`clicked on row with index: ${rowIndex}`);
        console.log(`  the row is: `, row);
        this.props.history.push(`/matches/${row.matchid}/edit`);
      }
    };

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
            keyField='id'
            data={this.state.matches.map(m => {
              return { matchid: m.matchid, teamnum: m.teamnum, matchnum: m.matchnum };
            })}
            columns={this.state.columns}
            rowEvents={ rowEvents }
          />

        </div>
      </Form>
    );
  }
}

export default MatchReportList;
