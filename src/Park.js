import React, { Component } from 'react';
import Buttons from './Buttons.js';

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
    this.props.removeCard();
    this.setState({
      displayFull: false,
    });
  }

  updateParkCodes = (storageKey, newArray) => {
    this.props.updateParkCodes(storageKey, newArray);
  }

  render() {
    const { visitedParks, bucketListParks } = this.props;
    const { name, images, state, url, description, parkCode } = this.props.selectedPark;
    const randomImage = Math.floor(Math.random() * images.length);
    const imagePath = images[randomImage].url;
    switch(this.state.displayFull) {
      case(true):
        return (
          <div className="card-overlay">
            <div className="park-card-large">
              <div className="park-text-large">
              <i className="far fa-times-circle" onClick={this.removeCard}></i>
                <h1 className="park-title">{name} National Park</h1>
                <h3>State: {state}</h3>
                <a href={url} target="_blank">Link to {name}'s National Park Service Page</a>
                <h3 className="park-descrip">{description}</h3>
                <button className="button-small" onClick={this.toggleFullCard}>View Less</button>
                <div className="user-list-btns">
                  <Buttons
                    iconType="fas fa-hiking"
                    storageKey="visitedParks"
                    parkCode={parkCode}
                    visitedParks={visitedParks}
                    bucketListParks={bucketListParks}
                    updateParkCodes={this.updateParkCodes}
                  />
                  <Buttons
                    iconType="fas fa-clipboard-list"
                    storageKey="bucketList"
                    parkCode={parkCode}
                    visitedParks={visitedParks}
                    bucketListParks={bucketListParks}
                    updateParkCodes={this.updateParkCodes}
                  />
                </div>
              </div>
              <img className="park-img-large" alt="park" src={imagePath} />
            </div>
          </div>
        );
      default:
        return (
          <div className="card-overlay">
            <div className="park-card-small">
              <i className="far fa-times-circle" id="remove-card" onClick={this.removeCard}></i>
              <h1 className="park-title">{name} National Park</h1>
              <img className="park-img-small" alt="park" src={imagePath} />
              <button className="button-small" onClick={this.toggleFullCard}>View More</button>
              <div className="user-list-btns">
                <Buttons 
                  iconType="fas fa-hiking"
                  storageKey="visitedParks"
                  parkCode={parkCode}
                  visitedParks={visitedParks}
                  bucketListParks={bucketListParks}
                  updateParkCodes={this.updateParkCodes}
                />
                <Buttons 
                  iconType="fas fa-clipboard-list" 
                  storageKey="bucketList" 
                  parkCode={parkCode} 
                  visitedParks={visitedParks}
                  bucketListParks={bucketListParks}
                  updateParkCodes={this.updateParkCodes}
                />
              </div>
            </div>
          </div>
        );
    }
  }
}

export default Park;