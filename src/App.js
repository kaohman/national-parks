import React, { Component } from 'react';
import './App.css';
import ParkMap from './ParkMap.js';
import FilterControls from './FilterControls.js';
import LandingPage from './LandingPage.js';
import apiKey from './utils/api-key';
import API from './utils/api';
import cleaners from './utils/cleaners';

class App extends Component {
  constructor() {
    super();
    this.state = {
      parks: [],
      usStates: {},
      currentUsStateName: 'default',
      currentUsStateCoord: [],
      currentParksToShow: [],
      visitedParkCodes: [],
      bucketListParkCodes: [],
      pageStatus: 'landing',
      randomImageClass: `landing-background${Math.floor(Math.random() * 6)}`
    };
  }

  showAllParks = () => {
    this.setState({
      currentUsStateName: 'default',
      currentUsStateCoord: [],
      currentParksToShow: this.state.parks
    })
  }

  showVisitedParks = (event) => {
    event.preventDefault();
    let visitedParks = this.state.parks.filter(park => {
      return this.state.visitedParkCodes.includes(park.parkCode)
    });

    this.setState({
      currentUsStateName: 'default',
      currentUsStateCoord: [],
      currentParksToShow: visitedParks
    });
  }

  showBucketList = (event) => {
    event.preventDefault();
    let bucketListParks = this.state.parks.filter( park => {
      return this.state.bucketListParkCodes.includes(park.parkCode)
    });

    this.setState({
      currentUsStateName: 'default',
      currentUsStateCoord: [],
      currentParksToShow: bucketListParks
    });
  }

  updateParkCodes = (storageKey, newArray) => {
    if (storageKey === 'visitedParks') {
      this.setState({
        visitedParkCodes: newArray
      });
    } else {
      this.setState({
        bucketListParkCodes: newArray
      });
    }
  }

  pullFromLocalStorage = () => {
    if (localStorage.hasOwnProperty('bucketList')) {
      let cachedBucketListKeys = localStorage.getItem('bucketList');
      let bucketListParkCodes = JSON.parse(cachedBucketListKeys);
      this.setState({
        bucketListParkCodes: bucketListParkCodes
      });
    }

    if (localStorage.hasOwnProperty('visitedParks')) {
      let cachedVistedParkKeys = localStorage.getItem('visitedParks');
      let visitedParkCodes = JSON.parse(cachedVistedParkKeys);
      this.setState({
        visitedParkCodes: visitedParkCodes
      });
    }
  }

  openHomePage = () => {
    this.setState({
      pageStatus: 'home'
    });
  }

  setMapToState = (stateName, stateObj) => {
    if (stateName !== 'default') {
      let parksToShow = this.state.parks.filter(park => {
        return park.state.includes(stateName)
      });
    
      this.setState({
        currentUsStateName: stateName,
        currentUsStateCoord: [stateObj.latitude, stateObj.longitude],
        currentParksToShow: parksToShow
      });
    } else {
      this.showAllParks();
    }
  }

  async componentDidMount() {
    try {
      const results = await API.getData(`https://api.nps.gov/api/v1/parks?limit=600&q=national%20park&fields=images&api_key=${apiKey}`);
      const parks = cleaners.setParks(results);
      this.setState({
        parks,
        currentParksToShow: parks,
      })
    } catch (error) {
      console.log(error);
    }

    try {
      const results = await API.getData('https://whateverly-datasets.herokuapp.com/api/v1/states1810');
      this.setState({
        usStates: results.states1810
      })
    } catch (error) {
      console.log(error);
    }

    this.pullFromLocalStorage();
  }

  render() {
    switch(this.state.pageStatus) {
      case('home'):
        return (
          <div className={this.state.randomImageClass}>
            <div className="overlay">
              <h1 className="home-title">Mark My Parks</h1>
              <p className="user-instructions">Click a map marker to learn more about that National Park</p>
              <ParkMap 
                parks={this.state.currentParksToShow} 
                stateName={this.state.currentUsStateName} 
                stateCoord={this.state.currentUsStateCoord}
                visitedParks={this.state.visitedParkCodes}
                bucketListParks={this.state.bucketListParkCodes}
                updateParkCodes={this.updateParkCodes}
              />
              <div className="filters">
                <button onClick={this.showAllParks} id="show-all-button">Show All Parks</button>
                <button onClick={this.showVisitedParks} id="show-visited-button"><img className="loc-icons" src="./assets/marker-icon-green.png" alt="green icon" /> Show {this.state.visitedParkCodes.length} Visited Parks</button>
                <button onClick={this.showBucketList} id="show-bucket-button"><img className="loc-icons" src="./assets/marker-icon-violet.png" alt="purple icon" /> Show {this.state.bucketListParkCodes.length} Bucket List Parks</button>
              </div>
              <FilterControls usStates={this.state.usStates} stateName={this.state.currentUsStateName} setMapToState={this.setMapToState} />
            </div>
          </div>
        );
      default:
        return (
          <div className={this.state.randomImageClass}>
            <LandingPage openHomePage={this.openHomePage} />
          </div>
        );
    }
  }
}

export default App;
