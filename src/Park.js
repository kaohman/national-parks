import React, { Component } from 'react';

class Park extends Component {
 constructor(props) {
   super(props);
   this.state = {

   };
 }
  showFullCard=() =>{

  }

  render() {
    let imagePath = `./${this.props.selectedPark.image}`;
    return (
      <div> 
        <img></img>
        <h1>{this.props.selectedPark.parkName} National Park</h1>
        <img src={imagePath} />
        {/* {imageSource} */}
        <h3>{this.props.selectedPark.description.substring(0, 80)}...</h3>
        <button onClick={this.showFullCard}>View More</button>
        <img></img>
        <img></img>
      </div>
    )
  }
}

export default Park;