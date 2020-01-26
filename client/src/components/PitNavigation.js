import React, { Component } from 'react';
import './PitContent.css';
import Logo from './1796NumberswithScratch.png';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Button from 'react-bootstrap/Button';

class PitNavigation extends Component {
  state = {
    validated: false,
    widthSize: '',
    heightSize: '',
    competition: '',
    competitionQuery: '',
    column: [
      {
        dataField: 'team_num',
        text: 'Team Number',
        sort: true
      },
      { dataField: 'team_name', text: 'Team Name', sort: true },
      {
        dataField: 'status',
        text: 'Pit Status',
        sort: true
      },
      {
        dataField: 'buttonValue',
        text: 'Scout'
      }
    ],
    tableData: []
  };

  initialSetup = () => {
    fetch('/currentCompetition')
      .then(response => response.json())
      .then(data => {
        if (data.competition === 'HVR') {
          this.setState({
            competition: 'Hudson Valley Regional',
            competitionQuery: 'HVR'
          });
        } else if (data.competition === 'SPLBI') {
          this.setState({
            competition: 'SBPLI #2 Regional',
            competitionQuery: 'SBPLI'
          });
        } else if (data.competition === 'NYC') {
          this.setState({
            competition: 'New York City Regional',
            competitionQuery: 'NYC'
          });
        } else if (data.competition === 'Champs') {
          this.setState({ competition: 'Champs', competitionQuery: 'Champs' });
        }
        this.getPitData(data.competition);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  getPitData = competition => {
    let base = '/pitTable?competition=';
    fetch(base.concat(competition))
      .then(response => response.json())
      .then(data => {
        data.pitData.map(team => (team.buttonValue = <Button>Start</Button>));
        this.setState({ tableData: data.pitData });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  componentDidMount() {
    this.initialSetup();
    this.setState({
      widthSize: window.innerWidth <= 760 ? '90%' : '50%'
    });
    this.setState({ heightSize: window.innerHeight + 'px' });
  }

  handleGroupChange = event => {
    let value = event.target.value;
    if (value === 'Hudson Valley Regional') {
      this.setState({
        competition: 'Hudson Valley Regional',
        competitionQuery: 'HVR'
      });
      this.getPitData('HVR');
    } else if (value === 'SBPLI #2 Regional') {
      this.setState({
        competition: 'SBPLI #2 Regional',
        competitionQuery: 'SBPLI'
      });
      this.getPitData('SBPLI');
    } else if (value === 'New York City Regional') {
      this.setState({
        competition: 'New York City Regional',
        competitionQuery: 'NYC'
      });
      this.getPitData('NYC');
    } else if (value === 'Champs') {
      this.setState({ competition: 'Champs', competitionQuery: 'Champs' });
      this.getPitData('Champs');
    }
  };

  render() {
    return (
      <div className='div-main'>
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
          <div className='pit-form'>
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
              <Form.Group
                controlId='formCompetition'
                style={{
                  width: '80%',
                  margin: '0 auto',
                  marginBottom: '10px'
                }}
                as={Row}
              >
                <Form.Control
                  style={{
                    background: 'none',
                    fontFamily: 'Helvetica, Arial'
                  }}
                  as='select'
                  onChange={this.handleGroupChange}
                  value={this.state.competition}
                >
                  <option>Hudson Valley Regional</option>
                  <option>SBPLI #2 Regional</option>
                  <option>New York City Regional</option>
                  <option>Champs</option>
                </Form.Control>
              </Form.Group>
              <Button
                type='btn'
                onClick={() => this.getPitData(this.state.competitionQuery)}
                className='btn-lg'
                style={{ fontFamily: 'Helvetica, Arial' }}
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>
        <BootstrapTable
          // stripped
          // hover
          className='no-outline-on-focus'
          keyField='num'
          style={{
            focus: {
              outline: '0',
              backgroundColor: 'none',
              border: 'none'
            }
          }}
          rowStyle={{
            border: '0px',
            outline: '0px',
            focus: {
              outline: 'none',
              backgroundColor: 'none',
              border: '0px'
            }
          }}
          rowStyle={this.state.style}
          // bordered
          bootstrap4
          data={this.state.tableData}
          columns={this.state.column}
        />
      </div>
    );
  }
}

export default PitNavigation;
