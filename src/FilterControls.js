import React, { Component } from 'react';
import UsState from './UsState.js';

class FilterControls extends Component {
 constructor(props) {
  super(props);
  this.state = {
    stateName: this.props.stateName,
    selectedState: {}
  };
 }
  
  getState = (event) => {
    this.setState({
      stateName: event.target.value,
      selectedState: this.props.usStates[event.target.value]
    });
    this.setMapToState(event.target.value, this.props.usStates[event.target.value]);
  }

  setMapToState = (stateName, stateObj) => {
    this.props.setMapToState(stateName, stateObj);
  }

  render() {
    return (
      <div className="filter-controls">
        <label className="filter-label">View Parks By State:
          <select id="select-menu" value={this.props.stateName} onChange={this.getState}>
            <option value="default">Please pick a state</option>
          {
            Object.keys(this.props.usStates).map(usState => {
              return(<option value={[usState]} key={this.props.usStates[usState].abbreviation}>{[usState]}</option>)
            })
          }
          </select>
        </label>
        {
          this.props.stateName !== 'default' && 
          <UsState name={this.state.stateName} selectedState={this.state.selectedState}/>
        }
      </div>
    )
  }
}

export default FilterControls;