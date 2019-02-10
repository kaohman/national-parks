import React from 'react';
import { connect } from 'react-redux';
import { setParksToShow } from './actions';

const ControlForm = ({ usStates, parks, parksToDisplay, setParksToShow, visitedParkCodes, bucketListParkCodes }) => {
  const showAllParks = (event) => {
    event.preventDefault();
    setParksToShow('all');
  }

  const showVisitedParks = (event) => {
    event.preventDefault();
    setParksToShow('visited');
  }

  const showBucketList = (event) => {
    event.preventDefault();
    setParksToShow('bucket');
  }
  
  const getState = (event) => {
    setParksToShow(event.target.value);
    // this.setMapToState(event.target.value, this.props.usStates[event.target.value]);
  }

  // setMapToState = (stateName, stateObj) => {
  //   this.props.setMapToState(stateName, stateObj);
  // }

  return (
    <div className="filter-controls">
      <div className="filters">
        <button onClick={showAllParks} id="show-all-button">Show All Parks</button>
        <button onClick={showVisitedParks} id="show-visited-button"><img className="loc-icons" src="./assets/marker-icon-green.png" alt="green icon" /> Show {visitedParkCodes.length} Visited Parks</button>
        <button onClick={showBucketList} id="show-bucket-button"><img className="loc-icons" src="./assets/marker-icon-violet.png" alt="purple icon" /> Show {bucketListParkCodes.length} Bucket List Parks</button>
      </div>
      {/* <label className="filter-label">View Specific Park:
        <select id="select-menu" value={this.props.stateName} onChange={this.getState}>
          <option value="default">Please pick a state</option>
          {
            Object.keys(this.props.usStates).map(usState => {
              return (<option value={[usState]} key={this.props.usStates[usState].abbreviation}>{[usState]}</option>)
            })
          }
        </select>
      </label> */}
      <label className="filter-label">View Parks By State:
        <select id="select-menu" value={parksToDisplay} onChange={getState}>
          <option value="default">Please pick a state</option>
        {
          Object.keys(usStates).map(usState => {
            return (<option value={usState.abbreviation} key={usState.abbreviation}>{[usState]}</option>)
          })
        }
        </select>
      </label>
    </div>
  )
}

const mapStateToProps = (state) => ({
  usStates: state.usStates,
  parks: state.parks,
  visitedParkCodes: state.visitedParkCodes,
  bucketListParkCodes: state.bucketListParkCodes,
  parksToDisplay: state.parksToDisplay,
});

const mapDispatchToProps = (dispatch) => ({
  setParksToShow: (name) => dispatch(setParksToShow(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlForm);