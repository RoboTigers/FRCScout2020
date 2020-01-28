import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class TabNav extends Component {
  state = {
    activeTab: ""
  };

  componentDidMount() {
    this.setState({
      activeTab: localStorage.getItem("activeTab") || "match"
    });
  }

  handleSelect = selectedTab => {
    this.setState({
      activeTab: selectedTab
    });
    localStorage.setItem("activeTab", selectedTab);
    this.props.tabHandler(selectedTab);
  };

  render() {
    return (
      <Router>
        <Nav variant="tabs" defaultActiveKey="/">
          <Nav.Item>
            <Nav.Link href="/pits">Pit</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/matches">Match</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/analystHome">Analyst</Nav.Link>
          </Nav.Item>
        </Nav>
      </Router>

    );
  }
}

export default TabNav;
