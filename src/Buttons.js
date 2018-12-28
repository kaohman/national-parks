import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

class Buttons extends Component {
  constructor(props) {
   super(props);
   this.state = {
     parkUrl: this.props.parkUrl,
     storageKey: this.props.storageKey,
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
    let toolTipText;
    if (this.state.storageKey === 'visitedParks') {
      buttonType = this.props.visitedParks;
      toolTipText = buttonType.includes(this.state.parkUrl) ? 'Remove from Visited Parks' : 'Add to Visited Parks';
    } else {
      buttonType = this.props.bucketListParks;
      toolTipText = buttonType.includes(this.state.parkUrl) ? 'Remove from Bucket List Parks' : 'Add to Bucket List Parks';
    }

    return (
      <div className="icon-btns">
        <span 
          onClick={this.saveNewParksArray}
          className={this.props.iconType} 
          id={
            buttonType.includes(this.state.parkUrl) ? this.state.storageKey : ''
          }
          data-tip 
          data-for={"tooltip/" + this.state.storageKey}
          >
        </span>
        <ReactTooltip id={"tooltip/" + this.state.storageKey} type='dark' effect='solid'>{toolTipText}</ReactTooltip>
      </div>
    )
  }
}

export default Buttons;