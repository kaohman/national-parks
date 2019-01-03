import React from 'react';


function UsState(props) {
  return (
    <div className="state-card">
      <h1>{props.name}</h1>
      <h3>Capital: <span>{props.selectedState.capitalCity}</span></h3>
      <h3>Population: <span>{props.selectedState.Population.toLocaleString()}</span></h3>
      <h3>Date Established: <span>{props.selectedState.dateEstablished}</span></h3>
      <h3>Number of Parks in State: <span>{props.selectedState.nationalParks.length}</span></h3>
      <h3>State Flower: <span>{props.selectedState.stateFlower}</span></h3>
    </div>
  )
}

export default UsState;