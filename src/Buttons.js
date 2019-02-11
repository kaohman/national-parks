import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { toggleVisitedPark, toggleBucketListPark } from './actions';

class Buttons extends Component {
  constructor(props) {
   super(props);
   this.state = {
     storageKey: this.props.storageKey,
   };
  }

  toggleItem = () => {
    const { visitedParkCodes, bucketListParkCodes, currentParkCode, toggleVisitedPark, toggleBucketListPark } = this.props;
    let items;
    if (this.state.storageKey === 'visited') {
      items = visitedParkCodes;
      toggleVisitedPark(currentParkCode);
    } else {
      items = bucketListParkCodes;
      toggleBucketListPark(currentParkCode);
    }
    const newItems = items.includes(currentParkCode) ? items.filter(parkCode => parkCode !== currentParkCode) : [...items, currentParkCode];
    localStorage.setItem(this.state.storageKey, JSON.stringify(newItems));
  }
  
  render() {
    let buttonType;
    let toolTipText;
    const { currentParkCode, visitedParkCodes, bucketListParkCodes } = this.props;
    const { storageKey } = this.state;
    if (this.state.storageKey === 'visited') {
      buttonType = visitedParkCodes;
      toolTipText = buttonType.includes(currentParkCode) ? 'Remove from Visited Parks' : 'Add to Visited Parks';
    } else {
      buttonType = bucketListParkCodes;
      toolTipText = buttonType.includes(currentParkCode) ? 'Remove from Bucket List Parks' : 'Add to Bucket List Parks';
    }

    return (
      <div className="icon-btns">
        <span 
          onClick={this.toggleItem}
          className={this.props.iconType} 
          id={
            buttonType.includes(currentParkCode) ? storageKey : ''
          }
          data-tip 
          data-for={"tooltip/" + storageKey}
          >
        </span>
        <ReactTooltip id={"tooltip/" + storageKey} type='dark' effect='solid'>{toolTipText}</ReactTooltip>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentParkCode: state.currentParkCode,
  visitedParkCodes: state.visitedParkCodes,
  bucketListParkCodes: state.bucketListParkCodes,
});

const mapDispatchToProps = (dispatch) => ({
  toggleBucketListPark: (parkCode) => dispatch(toggleBucketListPark(parkCode)),
  toggleVisitedPark: (parkCode) => dispatch(toggleVisitedPark(parkCode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);