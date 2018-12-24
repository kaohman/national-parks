import React, { Component } from 'react';
import Buttons from './Buttons.js';

class Park extends Component {
 constructor(props) {
    super(props);
    this.state = {
      displayFull: false  
   };
 }
  showFullCard= () => {
    this.setState({
      displayFull: true
    });
  }

  removeCard = (event) => {
    event.preventDefault();
    this.props.removeCard();
    this.setState({
      displayFull: false
    });
  }

  render() {
    let imagePath = `./${this.props.selectedPark.image}`;
    return (
      <div className="card-overlay">
        <div className="park-card-small"> 
          <i className="far fa-times-circle" onClick={this.removeCard}></i>
          <h1 className="park-title">{this.props.selectedPark.parkName} National Park</h1>
          <img className="park-img" src={imagePath} />
          {/* {imageSource} */}
          <h3 className="park-text">{this.props.selectedPark.description.substring(0, 80)}...</h3>
          <button className="button-small" onClick={this.showFullCard}>View More</button>
          <div className="user-list-btns">
          <Buttons iconType="fas fa-hiking" toolTipText="Add to Visited Parks" toolTipSide="left" parkUrl={this.props.selectedPark.urlCode} storageKey="visitedParks"/>
          <Buttons iconType="fas fa-clipboard-list" toolTipText="Add to Bucket List" toolTipSide="right" parkUrl={this.props.selectedPark.urlCode} storageKey="bucketList"/>
          </div>
        </div>
      </div>
    )
  }
}

export default Park;