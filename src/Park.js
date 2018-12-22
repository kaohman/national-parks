import React, { Component } from 'react';

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
          <p onClick={this.removeCard}>X</p>
          <h1 className="park-title">{this.props.selectedPark.parkName} National Park</h1>
          <img className="park-img" src={imagePath} />
          {/* {imageSource} */}
          <h3 className="park-text">{this.props.selectedPark.description.substring(0, 80)}...</h3>
          <button className="button-small" onClick={this.showFullCard}>View More</button>
          <p>Visited</p>
          <p>Bucket</p>
        </div>
      </div>
    )
  }
}

export default Park;