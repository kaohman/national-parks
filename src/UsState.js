import React, { Component } from 'react';

class UsState extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <h3>Capital: {this.props.selectedState.capitalCity}</h3>
        <h3>Population: {this.props.selectedState.Population}</h3>
        <h3>Number of Parks in State: {this.props.selectedState.nationalParks.length}</h3>
        <h3>Date Established: {this.props.selectedState.dateEstablished}</h3>
        <h3>State Flower: {this.props.selectedState.stateFlower}</h3>
      </div>
    )
  }
}

export default UsState;