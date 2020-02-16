import React, { Component } from 'react';
import './PitContent.css';
import Logo from './1796NumberswithScratch.png';
import Row from 'react-bootstrap/Row';
import { Form, Dropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, {
  selectFilter,
  textFilter
} from 'react-bootstrap-table2-filter';

class Data extends Component {
  state = {
    widthSize: '',
    heightSize: '',
    competition: '',
    competitions: [],
    competitionData: [],
    teamData: []
  };

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
      })
      .then(() => {
        fetch(`/api/competitions/${this.state.competition}/matchData`)
          .then(response => response.json())
          .then(data => {
            let matchData = data.matchData;
            console.log(matchData);
            let alteredData = [];
            matchData
              .map(match => match.team_num)
              .filter((team, index, arr) => arr.indexOf(team) === index)
              .map(team => {
                let obj = {
                  teamNum: team,
                  matchesPlayed: 0,
                  bottomAutoScore: [],
                  outerAutoScore: [],
                  innerAutoScore: [],
                  crossLine: 0,
                  bottomTeleScore: [],
                  outerTeleScore: [],
                  innerTeleScore: [],
                  rotationControl: 0,
                  rotationTimer: [],
                  positionControl: 0,
                  positionTimer: [],
                  climb: 0,
                  climbTime: [],
                  buddyClimb: 0,
                  level: 0,
                  park: 0,
                  communication: 0,
                  break: 0,
                  penalties: 0,
                  yellowCards: 0,
                  redCards: 0
                };
                alteredData.push(obj);
              });
            console.log(alteredData);
            matchData.map(match => {
              let index = alteredData.findIndex(
                x => x.teamNum === match.team_num
              );
              alteredData[index].matchesPlayed++;
              alteredData[index].bottomAutoScore.push(
                match.auto_scored[0].value
              );
              alteredData[index].outerAutoScore.push(
                match.auto_scored[1].value
              );
              alteredData[index].innerAutoScore.push(
                match.auto_scored[2].value
              );
              if (match.cross_line === 'Yes') alteredData[index].crossLine++;
              alteredData[index].bottomTeleScore.push(
                match.teleop_scored[0].value
              );
              alteredData[index].outerTeleScore.push(
                match.teleop_scored[1].value
              );
              alteredData[index].innerTeleScore.push(
                match.teleop_scored[2].value
              );
              if (match.rotation_control === 'Yes') {
                alteredData[index].rotationControl++;
                alteredData[index].rotationTimer.push(match.rotation_timer);
              }
              if (match.position_control === 'Yes') {
                alteredData[index].positionControl++;
                alteredData[index].positionTimer.push(match.position_timer);
              }
              if (
                match.end_game === 'Hang' &&
                match.climb !== 'Assisted Climb'
              ) {
                alteredData[index].climb++;
                alteredData[index].climbTime.push(match.end_game_timer);
                alteredData[index].park++;
                if (match.climb === 'Buddy Climb')
                  alteredData[index].buddyClimb++;
                if (match.level !== 'No') alteredData[index].level++;
              } else if (match.end_game === 'Park') {
                alteredData[index].park++;
              }
              if (match.communication === 'Yes')
                alteredData[index].communication++;
              if (match.break === 'Yes') alteredData[index].break++;
              alteredData[index].penalties += match.negatives[0].value;
              alteredData[index].yellowCards += match.negatives[1].value;
              alteredData[index].redCards += match.negatives[2].value;
            });
            console.log(alteredData);
            this.setState({ competitionData: alteredData });
          });
      })
      .catch(error => {
        console.error('Error:', error);
      });
    this.setState({
      widthSize: window.innerWidth <= 760 ? '90%' : '50%'
    });
    this.setState({ heightSize: window.innerHeight + 'px' });
  }

  getData = competition => {
    this.setState({ competition });
    fetch(`/api/competitions/${this.state.competition}/matchData`)
      .then(response => response.json())
      .then(data => {
        let matchData = data.matchData;
        console.log(matchData);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  render() {
    const competitionItems = this.state.competitions.map(competition => (
      <Dropdown.Item
        eventKey={competition.shortname}
        key={competition.competitionid}
        style={{ fontFamily: 'Helvetica, Arial' }}
      >
        {competition.shortname}
      </Dropdown.Item>
    ));
    if (this.state.competition === '') {
      return null;
    }

    let columns = [
      {
        headerStyle: {
          width: '25%',
          fontSize: '100%',
          outline: 'none'
        },
        sortCaret: (order, column) => {
          return '';
        },
        dataField: 'teamNum',
        text: 'Team Number',
        sort: true,
        filter: textFilter({
          className: 'customtextbar'
        })
      },
      {
        headerStyle: {
          width: '25%',
          fontSize: '100%',
          outline: 'none'
        },
        dataField: 'matchesPlayed',
        text: 'Matches Played'
      },
      {}
    ];

    return (
      <div className='div-main' style={{ minHeight: this.state.heightSize }}>
        <div className='justify-content-center'>
          <img
            alt='Logo'
            src={Logo}
            style={{
              width: this.state.widthSize === '90%' ? '70%' : '30%',
              marginTop: '20px',
              marginLeft: '10px'
            }}
          />
        </div>
        <div style={{ width: this.state.widthSize }} className='div-second'>
          <div className='div-form'>
            <Form.Group
              style={{
                width: '100%',
                margin: '0 auto',
                marginBottom: '10px'
              }}
              as={Row}
            >
              <Form.Label
                className='mb-1'
                style={{
                  fontFamily: 'Helvetica, Arial',
                  fontSize: '110%',
                  margin: '0 auto'
                }}
              >
                Competition:
              </Form.Label>
            </Form.Group>
            <Dropdown
              style={{
                marginBottom: '10px'
              }}
              focusFirstItemOnShow={false}
              onSelect={this.getData}
            >
              <Dropdown.Toggle
                style={{ fontFamily: 'Helvetica, Arial', textAlign: 'center' }}
                size='lg'
                variant='success'
                id='dropdown-basic'
              >
                {this.state.competition}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ minWidth: '3%' }}>
                {competitionItems}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

export default Data;
