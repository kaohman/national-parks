import React, { Component } from 'react';
import './styles/main.scss';


class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleClick = (event) => {
    event.preventDefault();
    this.props.openHomePage();
  }

  render() {
    return(
        <div className="splash-div">
          <h1 className="splash-title">Mark My Parks</h1>
          <div className="info-card">
            <p>Dreaming about your next adventure?</p>
            <p>Looking for National Park information for the perfect trip?</p>
            <p>Find details and resources on all 58 U.S. National Parks</p>
          </div>
          <button className="enter-btn" onClick={this.handleClick}>Explore Now</button>
        </div>
    );
  }
}

export default LandingPage;