import React, { Component } from 'react';
import UsState from './UsState.js';

class FilterControls extends Component {
 constructor(props) {
  super(props);
  this.state = {
    stateName: 'default',
    selectedState: {}
  };
 }
  
  getState = (event) => {
    this.setState({
      stateName: event.target.value,
      selectedState: this.props.usStates[event.target.value]
    })
  }

  render() {
    return (
      <div>
        <select value={this.state.stateName} onChange={this.getState}>
          <option value="default">Please pick a state</option>
        {
          Object.keys(this.props.usStates).map(usState => {
            return(<option value={[usState]}>{[usState]}</option>)
          })
        }
        </select>
        {
          this.state.stateName !== 'default' && 
          <UsState name={this.state.stateName} selectedState={this.state.selectedState}/>
        }
      </div>
    )
  }
}

export default FilterControls;