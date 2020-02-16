import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import NavLink from 'react-bootstrap/NavLink';
import { AuthContext } from '../contexts/auth_context';

class TabNav extends Component {
  static contextType = AuthContext;

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

  loginOrLogoutLink() {
    if (this.context.isLoggedIn) {
      return (
        <Nav.Item>
          <Link className="nav-link" to="/logout">
            Logout
          </Link>
        </Nav.Item>
      )
    } else {
      return (
        <Nav.Item>
          <Link className='nav-link' to='/login'>
            Login
          </Link>
        </Nav.Item>
      )
    }
  }

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
          <Link className='nav-link' to='/analystHome'>
            Analyst
          </Link>
        </Nav.Item>
        {this.loginOrLogoutLink()}
      </Nav>
    );
  }
}

export default TabNav;
