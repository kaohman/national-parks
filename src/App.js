import React, { Component } from 'react';
import './App.css';
import ParkMap from './ParkMap.js';
import FilterControls from './FilterControls.js';
import Buttons from './Buttons.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      parks: [],
      usStates: {},
      currentParksToShow: [],
      vistedParks: [],
      bucketListParks: []
    };
  }

  showAllParks = (event) => {
    event.preventDefault();
    this.setState({
      currentParksToShow: this.state.parks
    })
  }

  showVisitedParks = (event) => {
    event.preventDefault();
  }

  showBucketList = (event) => {
    event.preventDefault();
    let bucketListParks;

    if (localStorage.hasOwnProperty('bucketList')) {
      let cachedBucketListKeys = localStorage.getItem('bucketList');
      let bucketListKeys = JSON.parse(cachedBucketListKeys);
      
      bucketListParks = this.state.parks.filter( park => {
        return bucketListKeys.includes(park.urlCode)
      });
  
      this.setState({
        currentParksToShow: bucketListParks
      });
    } 
  }

  componentDidMount() {
    fetch("https://whateverly-datasets.herokuapp.com/api/v1/nationalParks1810")
      .then(data => data.json())
      .then(results => {
        this.setState({
          parks: results.nationalParks1810,
          currentParksToShow: results.nationalParks1810
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
        <ParkMap parks={this.state.currentParksToShow}/>
        <button onClick={this.showAllParks}>Show All Parks</button>
        <button onClick={this.showVisitedParks}>Show Visited Parks</button>
        <button onClick={this.showBucketList}>Show Bucket List Parks</button>
        <FilterControls usStates={this.state.usStates}/>
      </div>
    )
  }
}

export default App;
