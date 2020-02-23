import React, { Component, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import SubjectiveCategory from './SubjectiveCategory';

class SuperScoutContent extends Component {
    state = {
        competition: '',
        matchNum: '',
        allianceColor: '',
        play: '',
        teams: [],
        allianceColorOptions: [
            { id: 1, label: 'Red' },
            { id: 2, label: 'Blue' }
        ],
        playOptions: [
            { id: 3, label: 'Defense' },
            { id: 4, label: 'Driver' }
        ],
        categoryTitles: [ 'Speed', 'Agility', 'Counter Defense', 'Good Decisions', 'Bad Decisions']
    }

    componentDidMount() {
        this.setState({ competition: this.props.match.params.competition });
    }

    handleMatchNum = event => {
        this.setState({ matchNum: event.target.value });
    };

    handleAllianceColor = option => {
        this.setState({ allianceColor: option.label });
    };

    handlePlay = option => {
        this.setState({ play: option.label });
    };

    //TODO: Add express route and wire up the database update
    handleSumbit = event => {
        const data = {
        competition: this.state.competition,
        matchNum: this.state.matchNum
        }

        fetch('/api/superFOO', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {})
        .catch(error => {
            console.error('Error', error);
        });
        alert('submitted');
    };

    generateSubjectiveCategories = () => {
        let parent = [];
        this.state.categoryTitles.map(title => {
            parent.push(
                <SubjectiveCategory
                name={title}
                color={this.state.allianceColor}
                play={this.state.play}
            />
            );
        });
        return parent;
      }
      
  render() {
      console.log("competition is ", this.state.competition);
    return <div>

        <Form.Group style={{ width: '20%', marginLeft: '10%', marginTop: '2%' }} as={Row}>
        <Form.Label
            style={{
                fontFamily: 'Helvetica, Arial',
                fontSize: '110%'
            }}
            >{this.state.competition}</Form.Label>
        </Form.Group>

        <Form.Group style={{ width: '20%', marginLeft: '10%', marginTop: '2%' }} as={Row}>
            <Form.Control
            value={this.state.matchNum}
            autoComplete='off'
            type='number'
            placeholder='Match Number'
            onChange={this.handleMatchNum}
            />
        </Form.Group>

        {this.state.matchNum != '' ? 

            <Fragment>

        <Form.Group
            style={{ width: '60%', marginLeft: '10%' }}
            as={Row}
        >
            {this.state.allianceColorOptions.map(option => (
            <Form.Check
                style={{ fontFamily: 'Helvetica, Arial' }}
                inline
                custom
                label={option.label}
                color={option.label}
                type='radio'
                onChange={() => this.handleAllianceColor(option)}
                checked={this.state.allianceColor === option.label}
                id={option.id}
                key={option.id}
            />
            ))}
        </Form.Group>
        
        {this.state.allianceColor != '' ?
            <Fragment>
        <Form.Group
            style={{ width: '60%', marginLeft: '10%' }}
            as={Row}
        >
            {this.state.playOptions.map(option => (
            <Form.Check
                style={{ fontFamily: 'Helvetica, Arial' }}
                inline
                custom
                label={option.label}
                play={option.label}
                type='radio'
                onChange={() => this.handlePlay(option)}
                checked={this.state.play === option.label}
                id={option.id}
                key={option.id}
            />
            ))}
        </Form.Group>

        {this.state.play != '' ?
            <Fragment>

                {this.generateSubjectiveCategories()}

                <Button
                    variant='success'
                    type='btn'
                    style={{
                        fontFamily: 'Helvetica, Arial',
                        boxShadow: '-3px 3px black, -2px 2px black, -1px 1px black',
                        border: '1px solid black'
                    }}
                    onClick={this.handleSumbit}
                    className='btn-lg'
                    >
                    Submit
                </Button>

                </Fragment>
                    : ''
                }
            </Fragment>
            : ''
        }

        </Fragment>

            : ''
        }

    </div>;
  }
}

export default SuperScoutContent;