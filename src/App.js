import React, { Component } from 'react';
import './App.css';
import ParkMap from './ParkMap.js';
import FilterControls from './FilterControls.js';
import UsState from './UsState.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      parks: [],
      usStates: {}
    };
  }

  componentDidMount() {
    fetch("https://whateverly-datasets.herokuapp.com/api/v1/nationalParks1810")
      .then(data => data.json())
      .then(results => {
        this.setState({
          parks: results.nationalParks1810
        });
      })
      .catch(error => console.log(error));

    fetch("https://whateverly-datasets.herokuapp.com/api/v1/states1810")
      .then(data => data.json())
      .then(results => {
        this.setState({
          usStates: results.states1810
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h1>Mark My Parks</h1>
        <ParkMap parks={this.state.parks}/>
        <FilterControls usStates={this.state.usStates}/>
      </div>
    )
  }
}

export default App;
