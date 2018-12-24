import React, { Component } from 'react';

class Buttons extends Component {
  constructor(props) {
   super(props);
   this.state = {
     parkUrl: this.props.parkUrl,
     storageKey: this.props.storageKey
   };
  }

  checkLocalStorage = () => {
    if (localStorage.hasOwnProperty(this.state.storageKey)) {
      this.saveToLocalStorage();
    } else {
      this.createStorage();
    }
  }

  createStorage = () => {
    let parkKeys = JSON.stringify([this.state.parkUrl]);
    localStorage.setItem(this.state.storageKey, parkKeys);
  }

  saveToLocalStorage = () => {
    let parksKeys = JSON.parse(localStorage.getItem(this.state.storageKey));
    parksKeys.push(this.state.parkUrl);
    let newKeysToStore = JSON.stringify(parksKeys);
    localStorage.setItem(this.state.storageKey, newKeysToStore);
  }

  render() {
    return (
      <div className="icon-btns">
        <span className={'tooltip' + this.props.toolTipSide}>{this.props.toolTipText}</span>
        <button className="icons" onClick={this.checkLocalStorage}><span className={this.props.iconType}></span></button>
      </div>
    )
  }
}

export default Buttons;