import React,{ Component } from 'react';
import Chart from './Chart.js';


class UsState extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="state-card">
        <h1>{this.props.name}</h1>
        <h3>Capital: <span>{this.props.selectedState.capitalCity}</span></h3>
        <h3>Population: <span>{this.props.selectedState.Population.toLocaleString()}</span>
        </h3>
        <h3>Date Established: <span>{this.props.selectedState.dateEstablished}</span></h3>
        <h3>Number of Parks in State: <span>{this.props.selectedState.nationalParks.length}</span></h3>
        <h3>State Flower: <span>{this.props.selectedState.stateFlower}</span></h3>
          <div>
              <Chart 
                currentStateAnnualVisitors={this.props.currentStateAnnualVisitors}
                statePopulation={this.props.selectedState.Population}
              />
            </div>
      </div>
    )
  }
}

export default UsState;

