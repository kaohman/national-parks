import React, { Component } from 'react';

class UsState extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <h3>{this.props.selectedState.stateFlower}</h3>
        <h3></h3>
        <h3></h3>
      </div>
    )
  }
}

export default UsState;