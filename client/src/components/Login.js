import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { AuthContext } from '../contexts/auth_context';
import { Redirect } from 'react-router-dom';

import '../Login.css';

class Login extends Component {
  static contextType = AuthContext;

  state = {
    username: '',
    password: '',
    errors: [],
    redirectToReferrer: false
  };

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value })
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('handleSubmit', this.state);
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: this.state.username, password: this.state.password })
    }).then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          console.log('Successful login');
          this.context.logInUser(user);
          console.log(this.context.user);
          this.setState({
            errors: [],
            redirectToReferrer: true
          });
        });
      } else {
        this.setState({ errors: ['Failed to login. Please try again.'] });
      }
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <Container className='Login'>
        <Row>
          <Col></Col>
          <Col lg={6}>
            <h1>Login</h1>
            {this.state.errors.map((error, index) => (<Alert key={index} variant="danger">{error}</Alert>))}
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  value={this.state.username }
                  onChange={this.handleUsernameChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    )
  }
}

export default Login;
