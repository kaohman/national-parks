import React, { Component } from 'react';
import './styles/main.scss';


class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    this.props.openHomePage();
  }

  render() {
    return(
      <div className="splash-div">
        <h1 className="splash-title">Mark My Parks</h1>
        <button onClick={this.handleClick}>Enter Site</button>
      </div>
    );
  }
}

export default LandingPage;