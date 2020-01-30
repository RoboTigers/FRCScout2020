import React, { Component } from "react";
import { Form, Dropdown } from "react-bootstrap"
import { Link } from 'react-router-dom';

class MatchReportList extends Component {
    state = {
        competition: '',
        competitions: [],
        rows: [],
      };

    getMatchReportListForCompetition = competition => {
      this.setState({
        competition: competition
      });
      fetch(`/api/competitions/${competition}/matches`)
      .then(response => response.json())
      .then(data => {
        console.log("DATA", data)
      })

      // fetch(`/api/competitions/${competition}/matches`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify(competition)
      //   })
      //   .then(ress => {
      //     console.log('ress', ress)
      //     return ress
      //   })
      //     .then(response => response.json())
      //     .then(data => {
      //       this.setState({ rows: data.matchList });
      //       console.log("Success:", data);
      //     })
      //     .catch(error => {
      //       console.error("Error:", error);
      //     });
    };

    // handleCompetitionSelection = event => {
    //     this.setState({
    //         competition: event
    //     });
    // }

    componentDidMount() {
        fetch("/competitions")
            .then(response => response.json())
            .then(data => {
              this.setState({ competitions: data.competitions });
              console.log("Success:", data);
            })
            .catch(error => {
              console.error("Error:", error);
            });
    }

    render() {
      const matches = [
        {name: 'FooMatch', id: 123},
        {name: 'SharonMatch', id: 124},
        {name: 'FonMatch', id: 125},
        {name: 'GonMatch', id: 126},
        {name: 'HonMatch', id: 127}
      ];
      const competitions = [
        {name: 'FooMatch' },
        {name: 'ShoMatch' },
        {name: 'FooMatch' },
        {name: 'FooMatch' }
      ];
  
        const listItems = matches.map((match) =>
            <li key={match.id}>
                  <Link to={`/matches/${match.id}`}>{match.name}</Link>
            </li>
        );

        const competitionItems = this.state.competitions.map((competition) =>
          <Dropdown.Item eventKey={competition.shortname} value={competition.competitionid}>{competition.shortname}</Dropdown.Item>
        );
    
        return (   
            <Form onSubmit={this.handleSubmit} className="matches-form">
                <ul>{listItems}</ul>
          
                <Dropdown focusFirstItemOnShow={true} onSelect={this.getMatchReportListForCompetition}>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {this.state.competition || 'Select One'}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {competitionItems}
                  </Dropdown.Menu>
                </Dropdown>

            </Form> 

        );
    }
}

export default MatchReportList;
