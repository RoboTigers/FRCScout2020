import React, { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  user: {},
  logInUser: () => {},
  logOutUser: () => {}
});

export class AuthProvider extends React.Component {
  logInUser = (user) => {
    console.log('Auth Provider is logging in user', user);
    this.setState({
      isLoggedIn: true,
      user: user
    });
  }

  logOutUser = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    });
  }

  state = {
    isLoggedIn: false,
    user: {},
    logInUser: this.logInUser,
    logOutUser: this.logOutUser
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export const AuthConsumer = AuthContext.Consumer;
