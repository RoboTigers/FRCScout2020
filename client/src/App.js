import React, { useContext, Component } from 'react';
import './components/TabNav';
import TabNav from './components/TabNav';
import PitContent from './components/PitContent';
import MatchReportList from './components/MatchReportList';
import SuperScoutContent from './components/SuperScoutContent';
import AnalystContent from './components/AnalystContent';
import Login from './components/Login';
import Logout from './components/Logout';
import {
  AuthConsumer,
  AuthContext,
  AuthProvider
} from './contexts/auth_context';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PitNavigation from './components/PitNavigation';
import MatchContent from './components/MatchContent';
import Data from './components/Data';
import Home from './components/Home';

window.onunload = event => {
  window.scrollTo(0, 0);
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        authContext.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const AdminRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        authContext.isLoggedIn === true && authContext.user.role === 'admin' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
                messages: [
                  {
                    type: 'warning',
                    message: 'You must be an admin to access this page'
                  }
                ]
              }
            }}
          />
        )
      }
    />
  );
};

class App extends Component {
  state = {
    apiResponse: ''
  };

  constructor(props) {
    super(props);
    this.authProvider = React.createRef();
  }

  componentDidMount() {
    fetch('/api/isLoggedIn').then(response => {
      if (response.ok) {
        response.json().then(user => {
          this.authProvider.current.logInUser(user);
        });
      } else {
        this.authProvider.current.logOutUser();
      }
    });
  }

  render() {
    return (
      <AuthProvider ref={this.authProvider}>
        <div className='App'>
          <Router>
            <TabNav />
            <Switch>
              <ProtectedRoute path='/' exact component={Home} />
              <ProtectedRoute path='/pits' exact component={PitNavigation} />
              <AdminRoute
                path='/matches/:competition/:team/:matchNum/'
                exact
                component={MatchContent}
              />
              <ProtectedRoute
                path='/matches/new'
                exact
                component={MatchContent}
              />
              <ProtectedRoute
                path='/matches'
                exact
                component={MatchReportList}
              />
              <ProtectedRoute
                path='/supers/:competition'
                exact
                component={SuperScoutContent}
              />
              <ProtectedRoute path='/analystHome' component={AnalystContent} />
              <ProtectedRoute
                path='/pits/:competition/:team'
                exact
                component={PitContent}
              />
              <ProtectedRoute path='/data' exact exact component={Data} />
              <ProtectedRoute
                path='/data/:competition'
                exact
                component={Data}
              />
              <ProtectedRoute
                exact
                path='/data/:competition/:team/:dataType'
                component={Data}
              />
              <Route path='/login' component={Login} />
              <Route path='/logout' component={Logout} />
              <Route component={Home} />
            </Switch>
          </Router>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
