import React, {Component} from 'react'
import { Tabs, Tab } from 'react-bootstrap';

class TabNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.activeTab || "pit"
    };
   this.handleSelect = this.handleSelect.bind(this)
  }
  handleSelect(selectedTab) {
    this.setState({
      activeTab: selectedTab
    });
    this.props.tabHandler(selectedTab);
  }
  render () {
    return (
        <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
                <Tab eventKey="pit" title="Pit">
              
                </Tab>
                <Tab eventKey="scout" title="Scout"></Tab>
                <Tab eventKey="analyst" title="Analyst"></Tab>
        </Tabs>
    );
   }
}

export default TabNav;
