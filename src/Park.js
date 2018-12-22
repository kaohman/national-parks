import React, { Component } from 'react';

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
      displayFull: false
    });
  }

  render() {
    let imagePath = `./${this.props.selectedPark.image}`;
    switch(this.state.displayFull) {
      case(true):
        return (
          <div className="card-overlay">
            <div className="park-card-large">
              <p onClick={this.removeCard}>X</p>
              <img className="park-img-large" src={imagePath} />
              {/* {imageSource} */}
              <div className="park-text-large">
                <h1 className="park-title">{this.props.selectedPark.parkName} National Park</h1>
                <h3>State: {this.props.selectedPark.state}</h3>
                <h3>Date Established: {this.props.selectedPark.dateEstablished}</h3>
                <h3>Annual Visitors: {this.props.selectedPark.annualVisitors}</h3>
                <h3>Park Highlight: {this.props.selectedPark.editorsChoice}</h3>
                <a href={this.props.selectedPark.websiteUrl}>Link to NPS Page</a>
                <h3>{this.props.selectedPark.description}</h3>
                <button className="button-small" onClick={this.toggleFullCard}>View Less</button>
                <p><span>Visited</span><span>Bucket</span></p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="card-overlay">
            <div className="park-card-small">
              <p onClick={this.removeCard}>X</p>
              <h1 className="park-title">{this.props.selectedPark.parkName} National Park</h1>
              <img className="park-img-small" src={imagePath} />
              {/* {imageSource} */}
              <h3 className="park-text-small">Park Highlight: {this.props.selectedPark.editorsChoice}</h3>
              <button className="button-small" onClick={this.toggleFullCard}>View More</button>
              <p><span>Visited</span><span>Bucket</span></p>
            </div>
          </div>
        );
    }
  }
}

export default Park;