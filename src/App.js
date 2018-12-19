import React, { Component } from 'react';
import './App.css';
import ParkMap from './ParkMap.js';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Mark My Parks</h1>
        <ParkMap />
      </div>
    )
  }
}

export default App;
