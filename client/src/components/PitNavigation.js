import React, { Component } from 'react';
import './PitContent.css';
import Logo from './1796NumberswithScratch.png';
import Row from 'react-bootstrap/Row';
import { Form, Dropdown } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import filterFactory, {
  selectFilter,
  textFilter
} from 'react-bootstrap-table2-filter';

const selectOptions = {
  'Not Started': 'Not Started',
  'Follow Up': 'Follow Up',
  Done: 'Done'
};

const defaultSorted = [
  {
    dataField: 'team_num',
    order: 'asc'
  }
];

class PitNavigation extends Component {
  state = {
    widthSize: '',
    heightSize: '',
    competition: '',
    competitions: [],
    column: [
      {
        headerStyle: {
          width: '25%',
          fontSize: '100%',
          outline: 'none'
        },
        dataField: 'team_num',
        text: 'Team Number',
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
        dataField: 'team_name',
        text: 'Team Name',
        filter: textFilter({
          className: 'customtextbar'
        })
      },
      {
        headerStyle: {
          width: '20%',
          fontSize: '100%',
          outline: 'none'
        },
        dataField: 'coalesce',
        text: 'Status',
        formatter: cell => selectOptions[cell],
        filter: selectFilter({
          options: selectOptions
        })
      },
      {
        headerStyle: {
          width: '30%',
          fontSize: '100%',
          outline: 'none'
        },
        dataField: 'buttonValue',
        text: 'Scout'
      }
    ],
    tableData: []
  };

  getPitData = competition => {
    this.setState({ competition: competition });
    fetch(`/api/competitions/${competition}/pits`)
      .then(response => response.json())
      .then(data => {
        let pitData = data.pitData;
        pitData.sort((a, b) => a.team_num - b.team_num);
        pitData.map(row => {
          let buttonLabel;
          if (row.coalesce === 'Not Started') {
            buttonLabel = 'Start';
          } else if (row.coalesce === 'Follow Up') {
            buttonLabel = 'Continue';
          } else {
            buttonLabel = 'Edit';
          }
          row.buttonValue = (
            <Link to={`/pits/${this.state.competition}/${row.team_num}`}>
              <Button
                variant='success'
                style={{
                  fontSize: '100%',
                  boxShadow: '-3px 3px black, -2px 2px black, -1px 1px black',
                  border: '1px solid black'
                }}
              >
                {buttonLabel}
              </Button>
            </Link>
          );
        });
        this.setState({ tableData: pitData });
      })
      .catch(error => {
        console.error('Error:', error);
      });
    this.forceUpdate();
  };

  componentDidMount() {
    window.onbeforeunload = null;
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
        fetch(`/api/competitions/${this.state.competition}/pits`)
          .then(response => response.json())
          .then(data => {
            let pitData = data.pitData;
            pitData.sort((a, b) => a.team_num - b.team_num);
            pitData.map(row => {
              let buttonLabel;
              if (row.coalesce === 'Not Started') {
                buttonLabel = 'Start';
              } else if (row.coalesce === 'Follow Up') {
                buttonLabel = 'Continue';
              } else {
                buttonLabel = 'Edit';
              }
              row.buttonValue = (
                <Link to={`/pits/${this.state.competition}/${row.team_num}`}>
                  <Button
                    type='btn'
                    variant='success'
                    style={{
                      fontSize: '100%',
                      boxShadow:
                        '-3px 3px black, -2px 2px black, -1px 1px black',
                      border: '1px solid black'
                    }}
                  >
                    {buttonLabel}
                  </Button>
                </Link>
              );
            });
            this.setState({ tableData: pitData });
          })
          .catch(error => {
            console.error('Error:', error);
          });
      });
    this.setState({
      widthSize: window.innerWidth <= 760 ? '90%' : '50%'
    });
    this.setState({ heightSize: window.innerHeight + 'px' });
    this.forceUpdate();
  }

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
              onSelect={this.getPitData}
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
            <Button
              variant='dark'
              type='btn'
              onClick={() => this.getPitData(this.state.competition)}
              className='btn-xs'
              style={{ fontFamily: 'Helvetica, Arial' }}
            >
              Refresh
            </Button>
          </div>
        </div>
        <BootstrapTable
          striped
          hover
          keyField='team_num'
          bordered
          bootstrap4
          // defaultSorted={defaultSorted}
          data={this.state.tableData}
          columns={this.state.column}
          filter={filterFactory()}
        />
      </div>
    );
  }
}

export default PitNavigation;
