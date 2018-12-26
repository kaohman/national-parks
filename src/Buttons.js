import React, { Component } from 'react';

class Buttons extends Component {
  constructor(props) {
   super(props);
   this.state = {
     parkUrl: this.props.parkUrl,
     storageKey: this.props.storageKey
   };
  }

  saveNewParksArray = () => {
    let newArray;
    if (this.state.storageKey === 'visitedParks') {
      newArray = this.props.visitedParks;
    } else {
      newArray = this.props.bucketListParks;
    }

    if ((localStorage.hasOwnProperty(this.state.storageKey)) && (newArray.includes(this.state.parkUrl))) {
      let index = newArray.findIndex(parkCode => parkCode === this.state.parkUrl);
      newArray.splice(index, 1);
    } else {
      newArray.push(this.state.parkUrl);
    }
    this.saveToLocalStorage(newArray);
    this.updateParkCodes(this.state.storageKey, newArray);
  }
  
  saveToLocalStorage = (newArray) => {
    let newArrayToStore = JSON.stringify(newArray);
    localStorage.setItem(this.state.storageKey, newArrayToStore);
  }
  
  updateParkCodes = (storageKey, newArray) => {
    this.props.updateParkCodes(storageKey, newArray);
  }
  
  render() {
    let buttonType;
    if (this.state.storageKey === 'visitedParks') {
      buttonType = this.props.visitedParks;
    } else {
      buttonType = this.props.bucketListParks;
    }

    return (
      <div className="icon-btns">
        <button className="icons" onClick={this.saveNewParksArray}>
          <span 
            className={this.props.iconType} 
            id={
              buttonType.includes(this.state.parkUrl) ? 'partOfList' : ''
            }>
          </span>
        </button>
      </div>
    )
  }
}

export default Buttons;