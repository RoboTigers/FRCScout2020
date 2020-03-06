import React, { Component } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AuthContext } from '../contexts/auth_context';

class TeamPickList extends Component {
  static contextType = AuthContext;

  state = {
    competitions: [],
    competition: '',
    pickListResults: [],
    defaultSort: [{
      dataField: 'totalScore',
      order: 'desc'
    }],
    columns: [
      {
        dataField: 'teamDescriptor',
        text: 'Team'
      },
      {
        dataField: 'autoScoredBottom',
        text: 'Auto Scored Bottom',
        sort: true
      },
      {
        dataField: 'autoScoredOuter',
        text: 'Auto Scored Outer',
        sort: true
      },
      {
        dataField: 'autoScoredInner',
        text: 'Auto Scored Inner',
        sort: true
      },
      {
        dataField: 'teleopScoredBottom',
        text: 'Teleop Scored Bottom',
        sort: true
      },
      {
        dataField: 'teleopScoredOuter',
        text: 'Teleop Scored Outer',
        sort: true
      },
      {
        dataField: 'teleopScoredInner',
        text: 'Teleop Scored Inner',
        sort: true
      },
      {
        dataField: 'penalties',
        text: 'Penalties',
        sort: true
      },
      {
        dataField: 'yellowCard',
        text: 'Yellow Card',
        sort: true
      },
      {
        dataField: 'redCard',
        text: 'Red Card',
        sort: true
      },
      {
        dataField: 'totalScore',
        text: 'Total Score',
        sort: true,
      }
    ]
  }

  computeTotalScore(result) {
    const formula = [
      {
        dataField: 'autoScoredBottom',
        weight: 2
      },
      {
        dataField: 'autoScoredOuter',
        weight: 2.5
      },
      {
        dataField: 'autoScoredInner',
        weight: 3
      },
      {
        dataField: 'teleopScoredBottom',
        weight: 1
      },
      {
        dataField: 'teleopScoredOuter',
        weight: 1.5
      },
      {
        dataField: 'teleopScoredInner',
        weight: 2
      },
      {
        dataField: 'penalties',
        weight: -1
      },
      {
        dataField: 'yellowCard',
        weight: -10
      },
      {
        dataField: 'redCard',
        weight: -20
      }
    ]

    return formula.reduce((acc, value) => {
      return acc + (result[value.dataField] * value.weight);
    }, 0)
  }

  componentDidMount() {
    fetch('/competitions')
      .then(response => response.json())
      .then(data => {
        this.setState({ competitions: data.competitions });
        data.competitions.map(c => {
          if (c.iscurrent) {
            this.setState({ competition: c.shortname });
          }
        });
      }).then(() => {
        fetch(`/api/competitions/${this.state.competition}/pickLists/teams`)
          .then(response => response.json())
          .then((data) => {
            data.forEach((result) => {
              result.totalScore = this.computeTotalScore(result)
            });
            this.setState({
              pickListResults: data
            })
          });
      });
  }

  render() {
    return (
      <Container>
        <Row>
          <p>Competition: {this.state.competition}</p>
        </Row>
        <Row>
          <BootstrapTable
            striped
            hover
            keyField='teamId'
            bordered
            bootstrap4
            data={this.state.pickListResults}
            columns={this.state.columns}
            defaultSorted={this.state.defaultSort}
          />
        </Row>
      </Container>
    )
  }
}

export default TeamPickList;
