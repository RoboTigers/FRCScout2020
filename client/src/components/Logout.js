import React, { Component } from 'react';
import { AuthContext } from '../contexts/auth_context';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  static contextType = AuthContext;

  componentDidMount() {
    fetch('/logout').then((response) => {
      this.context.logOutUser();
    });
  }

  render() {
    if (this.context.isLoggedIn === false) {
      return (
        <Redirect to='/login' />
      )
    }
    return (<div></div>);
  }
}

export default Logout;
