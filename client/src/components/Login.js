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
    messages: [],
    redirectToReferrer: false
  };

  constructor(props) {
    super(props);
    if (
      props.location &&
      props.location.state &&
      Array.isArray(props.location.state.messages) &&
      props.location.state.messages.length > 0
    ) {
      this.state.messages = props.location.state.messages;
    }
  }

  componentDidMount() {
    window.onbeforeunload = null;
  }

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(response => {
      if (response.ok) {
        response.json().then(user => {
          this.context.logInUser(user);
          this.setState({
            messages: [],
            redirectToReferrer: true
          });
        });
      } else {
        this.setState({
          messages: [
            { type: 'danger', message: 'Failed to login. Please try again.' }
          ]
        });
      }
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <Container className='Login'>
        <Row>
          <Col></Col>
          <Col lg={6}>
            <h1>Login</h1>
            {this.state.messages.map(({ type, message }, index) => (
              <Alert key={index} variant={type}>
                {message}
              </Alert>
            ))}
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Username'
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                />
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter Password'
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
