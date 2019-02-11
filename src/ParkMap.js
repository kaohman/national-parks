import React, { Component } from 'react';
import { Map, Marker, Tooltip, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import Park from './Park.js';
import { connect } from 'react-redux';
import { setParkCardToShow } from './actions';

class ParkMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueStateZoom: { Alaska: 4, California: 5, Michigan: 5 },
    };
  }

  getPark = (event) => {
    const { parks, setParkCardToShow } = this.props;
    const park = parks.find(park => park.parkCode === event.target.options.id);
    console.log(park)
    setParkCardToShow(park.parkCode);
  }

  findParksToShow = () => {
    const { parks, parksToDisplay, visitedParkCodes, bucketListParkCodes, usStates } = this.props;
    let parksToShow;
    switch (parksToDisplay) {
      case 'all':
        parksToShow = parks;
        break;
      case 'visited':
        parksToShow = parks.filter(park => visitedParkCodes.includes(park.parkCode));
        break;
      case 'bucket':
        parksToShow = parks.filter(park => bucketListParkCodes.includes(park.parkCode));
        break;
      default: 
        const state = usStates.find(state => state.name === parksToDisplay);
        parksToShow = this.showParksInState(state.abbreviation);
    }
    return this.showParks(parksToShow);
  }

  showParksInState = (stateCode) => {
    return this.props.parks.filter(park => park.states.includes(stateCode))
  }

  showParks = (parks) => {
    const icon = {
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
      shadowUrl: './assets/marker-shadow.png'
    };
    const greenIcon = new L.icon({ ...icon, iconUrl: './assets/marker-icon-green.png'});
    const violetIcon = new L.icon({ ...icon, iconUrl: './assets/marker-icon-violet.png'});
    const blueIcon = new L.icon({ ...icon, iconUrl: './assets/marker-icon-blue.png'});

    const { visitedParkCodes, bucketListParkCodes } = this.props;
    return parks.map(park => {
      const { parkCode, name, lat, lon } = park;
      let currentIcon;
      if (visitedParkCodes.includes(parkCode)) {
        currentIcon = greenIcon;
      } else if (bucketListParkCodes.includes(parkCode)) {
        currentIcon = violetIcon;
      } else {
        currentIcon = blueIcon;
      }
      return (
        <Marker 
          position={[lat, lon]}
          icon={currentIcon}
          onClick={this.getPark}
          key={parkCode}
          id={parkCode}>
          <Tooltip>{name}</Tooltip>
        </Marker>
      )
    })
  }

  getMapInfo = () => {
    let zoom;
    let position;
    if (this.props.showUsState) {
      const { usStates, parksToDisplay } = this.props;
      const { uniqueStateZoom } = this.state;
      const state = usStates.find(state => state.name === parksToDisplay);
      zoom = uniqueStateZoom[state.name] ? uniqueStateZoom[state.name] : 6;
      position = [state.latitude, state.longitude];
    } else {
      zoom = 4;
      position = [37.0902, -95.7129];
    }
    return [zoom, position]
  }
  
  render() {
    const mapInfo = this.getMapInfo();
    const parksToShow = this.findParksToShow();
    const { currentParkCode, parks, parksToDisplay } = this.props;
    return (
     <div className="map-container">
        <Map 
          id="map" 
          minZoom='3'
          maxZoom='8'
          center={mapInfo[1]}
          zoom={mapInfo[0]}>
          <TileLayer 
            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}'
            attribution='Tiles &copy; Esri &mdash; Source: US National Park Service'
            maxZoom='8'
          />
          <TileLayer 
            url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}{r}.{ext}'
            attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            subdomains='abcd'
            minZoom='0'
            maxZoom='20'
            ext='png'
          />
          {parksToShow}
        </Map>
        {
          currentParkCode.length && 
          <Park 
            park={
              parks.find(park => park.parkCode === currentParkCode)
            }
          />
        }
      </div>   
    )
  }
}

const mapStateToProps = (state) => ({
  usStates: state.usStates,
  parksToDisplay: state.parksToDisplay,
  parks: state.parks,
  currentParkCode: state.currentParkCode,
  visitedParkCodes: state.visitedParkCodes,
  bucketListParkCodes: state.bucketListParkCodes,
  showUsState: state.showUsState,
});

const mapDispatchToProps = (dispatch) => ({
  setParkCardToShow: (parkCode) => dispatch(setParkCardToShow(parkCode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ParkMap);
