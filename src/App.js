import React, { Component } from 'react';
import './App.css';
import ParkMap from './ParkMap.js';
import FilterControls from './FilterControls.js';
import LandingPage from './LandingPage.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      parks: [],
      usStates: {},
      currentParksToShow: [],
      vistedParks: [],
      bucketListParks: [],
      pageStatus: 'landing',
      randomImageClass: `landing-background${Math.floor(Math.random() * 6)}`
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
    let visitedParks;

    if (localStorage.hasOwnProperty('visitedParks')) {
      let cachedVistedParkKeys = localStorage.getItem('visitedParks');
      let vistedParksKeys = JSON.parse(cachedVistedParkKeys);
      visitedParks = this.state.parks.filter(park => {
        return vistedParksKeys.includes(park.urlCode)
      });

      this.setState({
        currentParksToShow: visitedParks
      });
    }
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
        results.nationalParks1810.forEach(park => {
          if (park.parkName === 'Sequoia') {
            park.urlCode = 'seki2';
          }
        });
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

  openHomePage = () => {
    this.setState({
      pageStatus: 'home'
    });
  }

  render() {
    switch(this.state.pageStatus) {
      case('home'):
        return (
          <div className={this.state.randomImageClass}>
            <div className="overlay">
              <h1 className="home-title">Mark My Parks</h1>
              <ParkMap parks={this.state.currentParksToShow}/>
              <div className="filters">
                <button onClick={this.showAllParks}>Show All Parks</button>
                <button onClick={this.showVisitedParks}>Show Visited Parks</button>
                <button onClick={this.showBucketList}>Show Bucket List Parks</button>
              </div>
              <FilterControls usStates={this.state.usStates} />
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
