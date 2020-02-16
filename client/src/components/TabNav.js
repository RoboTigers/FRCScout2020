import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import NavLink from 'react-bootstrap/NavLink';

class TabNav extends Component {
  state = {
    activeTab: ''
  };

  componentDidMount() {
    this.setState({
      activeTab: localStorage.getItem('activeTab') || 'match'
    });
  }

  handleSelect = selectedTab => {
    this.setState({
      activeTab: selectedTab
    });
    localStorage.setItem('activeTab', selectedTab);
    this.props.tabHandler(selectedTab);
  };

  render() {
    return (
      <Nav variant='tabs'>
        <Nav.Item>
          <Link className='nav-link' to='/pits'>
            Pits
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className='nav-link' to='/matches'>
            Match
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className='nav-link' to='/data'>
            Data
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className='nav-link' to='/analystHome'>
            Analyst
          </Link>
        </Nav.Item>
      </Nav>
    );
  }
}

export default TabNav;
