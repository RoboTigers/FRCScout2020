import React from "react";
import "./components/TabNav";
import TabNav from "./components/TabNav";
import PitContent from "./components/PitContent";
import ScoutContent from "./components/ScoutContent";
import AnalystContent from "./components/AnalystContent";
import "bootstrap/dist/css/bootstrap.min.css";
//import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";

window.onbeforeunload = event => {
  return "";
};

window.onunload = event => {
  // window.scrollTo(0, 0);
};

function RenderTabContent({ selectedTab }) {
  if (selectedTab === "pit") {
    return <PitContent />;
  } else if (selectedTab === "scout") {
    return <ScoutContent />;
  } else {
    return <AnalystContent />;
  }
}

class App extends React.Component {
  state = {
    apiResponse: "",
    selectedTab: ""
  };

  callAPI() {
    fetch("/saveMatch")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentDidMount() {
    this.setState({
      selectedTab: localStorage.getItem("selectedTab") || "scout"
    });
  }

  handleTabSelect = event => {
    console.log("event in APP", event);
    this.setState({
      selectedTab: event
    });
    localStorage.setItem("selectedTab", event);
    sessionStorage.clear();
  };

  render() {
    return (
      <div className="App">
        <TabNav
          tabHandler={this.handleTabSelect}
          onClick={this.handleTabSelect}
        />
        <RenderTabContent selectedTab={this.state.selectedTab} />
      </div>
    );
  }
}

export default App;
