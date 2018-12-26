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
    return (
      <div className="icon-btns">
        <span className={'tooltip' + this.props.toolTipSide}>{this.props.toolTipText}</span>
        <button className="icons" onClick={this.saveNewParksArray}><span className={this.props.iconType}></span></button>
      </div>
    )
  }
}

export default Buttons;