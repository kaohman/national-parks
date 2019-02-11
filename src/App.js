import React, { Component } from 'react';
import './App.css';
import ParkMap from './ParkMap.js';
import ControlForm from './ControlForm.js';
import LandingPage from './LandingPage.js';
import apiKey from './utils/api-key';
import API from './utils/api';
import cleaners from './utils/cleaners';
import { connect } from 'react-redux';
import { setParks, setUsStates, setBucketListParks, setVisitedParks } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageStatus: 'landing',
      randomImageClass: `landing-background${Math.floor(Math.random() * 6)}`
    };
  }

  // updateParkCodes = (storageKey, newArray) => {
  //   if (storageKey === 'visitedParks') {
  //     this.setState({
  //       visitedParkCodes: newArray
  //     });
  //   } else {
  //     this.setState({
  //       bucketListParkCodes: newArray
  //     });
  //   }
  // }

  pullFromLocalStorage = () => {
    if (localStorage.hasOwnProperty('bucketList')) {
      let cachedBucketListKeys = localStorage.getItem('bucketList');
      let bucketListParkCodes = JSON.parse(cachedBucketListKeys);
      this.props.setBucketListParks(bucketListParkCodes);
    }

    if (localStorage.hasOwnProperty('visitedParks')) {
      let cachedVistedParkKeys = localStorage.getItem('visitedParks');
      let visitedParkCodes = JSON.parse(cachedVistedParkKeys);
      this.props.setVisitedParks(visitedParkCodes);
    }
  }

  openHomePage = () => {
    this.setState({
      pageStatus: 'home'
    });
  }

  // setMapToState = (stateName, stateObj) => {
  //   if (stateName !== 'default') {
  //     let parksToShow = this.state.parks.filter(park => {
  //       return park.state.includes(stateName)
  //     });
    
  //     this.setState({
  //       currentUsStateName: stateName,
  //       currentUsStateCoord: [stateObj.latitude, stateObj.longitude],
  //       currentParksToShow: parksToShow
  //     });
  //   } else {
  //     this.showAllParks();
  //   }
  // }

  async componentDidMount() {
    try {
      const results = await API.getData(`https://api.nps.gov/api/v1/parks?limit=600&q=national%20park&fields=images&api_key=${apiKey}`);
      const parks = cleaners.setParks(results);
      this.props.setParks(parks);
    } catch (error) {
      console.log(error);
    }

    try {
      const results = await API.getData('https://whateverly-datasets.herokuapp.com/api/v1/states1810');
      const usStates = cleaners.setUsStates(results);
      this.props.setUsStates(usStates);
    } catch (error) {
      console.log(error);
    }

    this.pullFromLocalStorage();
  }

  render() {
    const { pageStatus, randomImageClass } = this.state;
    switch(pageStatus) {
      case('home'):
        return (
          <div className={randomImageClass}>
            <div className="overlay">
              <h1 className="home-title">Mark My Parks</h1>
              <p className="user-instructions">Click a map marker to learn more about that National Park</p>
              <ParkMap />
              <ControlForm />
            </div>
          </div>
        );
      default:
        return (
          <div className={randomImageClass}>
            <LandingPage openHomePage={this.openHomePage} />
          </div>
        );
    }
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
});

const mapDispatchToProps = (dispatch) => ({
  setParks: (parks) => dispatch(setParks(parks)),
  setUsStates: (usStates) => dispatch(setUsStates(usStates)),
  setBucketListParks: (bucketListParkCodes) => dispatch(setBucketListParks(bucketListParkCodes)),
  setVisitedParks: (visitedParkCodes) => dispatch(setVisitedParks(visitedParkCodes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
