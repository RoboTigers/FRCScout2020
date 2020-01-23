import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

class TabNav extends Component {
  state = {
    activeTab: ""
  };

  componentDidMount() {
    this.setState({
      activeTab: localStorage.getItem("activeTab") || "match"
    });
  }

  handleSelect = selectedTab => {
    this.setState({
      activeTab: selectedTab
    });
    localStorage.setItem("activeTab", selectedTab);
    this.props.tabHandler(selectedTab);
  };

  render() {
    return (
      <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
        <Tab eventKey="pit" title="Pit"></Tab>
        <Tab eventKey="match" title="Match"></Tab>
        <Tab eventKey="analyst" title="Analyst"></Tab>
      </Tabs>
    );
  }
}

export default TabNav;
