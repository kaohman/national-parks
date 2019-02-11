import React, { Component } from 'react';
import Buttons from './Buttons.js';
import { connect } from 'react-redux';
import { toggleVisitedPark, toggleBucketListPark, setParkCardToShow } from './actions/index.js';

class Park extends Component {
 constructor(props) {
    super(props);
    this.state = {
      displayFull: false  
   };
 }
  toggleFullCard= () => {
    this.setState({
      displayFull: !this.state.displayFull
    });
  }

  removeCard = (event) => {
    event.preventDefault();
    this.props.setParkCardToShow('');
    this.setState({
      displayFull: false,
    });
  }

  setStateText = () => {
    const { states } = this.props.park;
    if (states.length === 1) {
      return `State: ${states[0]}`
    } else {
      return states.reduce((acc, state, index) => {
        acc = index === 0 ? `States: ${state}` : acc + `, ${state}`;
        return acc;
      }, '');
    }
  }

  render() {
    const { name, images, url, description } = this.props.park;
    const { displayFull } = this.state;
    const stateText = this.setStateText();
    return (
      <div className="card-overlay">
        <div className={displayFull ? "park-card-large" : "park-card-small"}>
          <div className={displayFull ? "park-text-large" : ""}>
            <i className="far fa-times-circle" onClick={this.removeCard}></i>
            <h1 className="park-title">{name} National Park</h1>
            {
              !displayFull && <img className="park-img-small" alt="park" src={images[0].url} />
            }
            <h3>{stateText}</h3>
            <a className="nps-link" href={url} target="_blank">Link to {name}'s National Park Service Page</a>
            <h3 className="park-descrip">{description}</h3>
            <button className="button-small" onClick={this.toggleFullCard}>{displayFull ? "View Less" : "View More"}</button>
            <div className="user-list-btns">
              <Buttons
                iconType="fas fa-hiking"
                storageKey="visited"
              />
              <Buttons
                iconType="fas fa-clipboard-list"
                storageKey="bucket"
              />
            </div>
          </div>
          {
            displayFull && <img className="park-img-large" alt="park" src={images[1].url} />
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleVisitedPark: (parkCode) => dispatch(toggleVisitedPark(parkCode)),
  toggleBucketListPark: (parkCode) => dispatch(toggleBucketListPark(parkCode)),
  setParkCardToShow: (parkCode) => dispatch(setParkCardToShow(parkCode)),
});

export default connect(null, mapDispatchToProps)(Park);