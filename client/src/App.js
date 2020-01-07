import React from 'react';
import './components/TabNav';
import TabNav from './components/TabNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse:"",
      selectedTab: ''
    };
  }
  callAPI() {
    fetch("/saveMatch")
    .then(res => res.text())
    .then(res => this.setState({apiResponse: res}));
  }
  componentWillMount() {
    //this.callAPI();
  }

  handleTabSelect = (event) => {
    console.log('event in APP', event)
    this.setState({
      selectedTab: event
    })
  }

render() {
  return (
    <div className="App">
      <TabNav tabHandler={this.handleTabSelect} onClick={this.handleTabSelect}/>
      
      <h1>{this.state.selectedTab}</h1>
    </div>
  );
}
}

export default App;
