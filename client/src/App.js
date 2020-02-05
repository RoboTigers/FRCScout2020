import React, { Component } from 'react';
import './components/TabNav';
import TabNav from './components/TabNav';
import PitContent from './components/PitContent';
import MatchReportList from './components/MatchReportList';
import AnalystContent from './components/AnalystContent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import PitNavigation from './components/PitNavigation';
import MatchContent from './components/MatchContent';

function RenderTabContent({ selectedTab }) {
  if (selectedTab === 'pit') {
    return <PitNavigation />;
  } else if (selectedTab === 'match') {
    return <MatchReportList />;
  } else {
    return <AnalystContent />;
  }
}

window.onunload = event => {
  window.scrollTo(0, 0);
};

class App extends Component {
  state = {
    apiResponse: '',
    selectedTab: ''
  };

  componentDidMount() {
    this.setState({
      selectedTab: localStorage.getItem('selectedTab') || 'match'
    });
  }

  handleTabSelect = event => {
    console.log('event in APP', event);
    this.setState({
      selectedTab: event
    });
    localStorage.setItem('selectedTab', event);
    sessionStorage.clear();
  };

  render() {
    return (
      <div className='App'>
        <Router>
          <TabNav onClick={this.handleTabSelect} />
          <Switch>
            <Route path='/pits' exact component={PitNavigation} />
            <Route path='/matches/:matchId/edit' component={MatchContent} />
            <Route path='/matches/new' component={MatchContent} />
            <Route path='/matches' component={MatchReportList} />
            <Route path='/analystHome' component={AnalystContent} />
            <Route
              path='/pits/:competition/:team'
              exact
              component={PitContent}
            />
          </Switch>
        </Router>
      </div>
    );
  }

  //   render() {
  //     const App = () => (
  //       <div>
  //         <Switch>
  //           <Route exact path='/' component={TabNav}/>
  //         </Switch>
  //       </div>
  //     )
  //     return (
  //       <Switch>
  //         <App/>
  //       </Switch>
  //     )
  //   }
}

export default App;
