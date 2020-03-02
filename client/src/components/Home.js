import React, { Component } from 'react';

class Home extends Component {
  componentDidMount() {
    window.onbeforeunload = null;
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}

export default Home;
