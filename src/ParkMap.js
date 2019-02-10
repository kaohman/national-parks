import React, { Component } from 'react';
import { Map, Marker, Tooltip, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import Park from './Park.js';

class ParkMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPark: null,
      zoom: 4,
      uniqueStateZoom: { Alaska: 4, California: 5, Michigan: 5 },
      position: [37.0902, -95.7129],
    };
  }

  getPark = (event) => {
    this.setState({
      selectedPark: this.props.parks.find( park => park.parkCode === event.target.options.id)
    }) 
  }

  removeCard = () => {
    this.setState({
      selectedPark: null
    });
  }

  updateParkCodes = (storageKey, newArray) => {
    this.props.updateParkCodes(storageKey, newArray);
  }

  showParks = () => {
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

    const { parks, visitedParks, bucketListParks } = this.props;
    return parks.map(park => {
      const { parkCode, name, lat, lon } = park;
      let currentIcon;
      if (visitedParks.includes(parkCode)) {
        currentIcon = greenIcon;
      } else if (bucketListParks.includes(parkCode)) {
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
  
  render() {
    const { stateName, visitedParks, bucketListParks, stateCoord } = this.props;
    const { zoom, position, uniqueStateZoom, selectedPark } = this.state;
    const parksToShow = this.showParks();
    let stateZoom = uniqueStateZoom[stateName] ? uniqueStateZoom[stateName] : 6;
    return (
     <div className="map-container">
        <Map 
          id="map" 
          minZoom='3'
          maxZoom='8'
          center={ stateCoord.length > 0 ? stateCoord : position }
          zoom={stateCoord.length > 0 ? stateZoom : zoom }>
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
          selectedPark && 
          <Park 
            removeCard={this.removeCard} 
            selectedPark={selectedPark}
            visitedParks={visitedParks}
            bucketListParks={bucketListParks}
            updateParkCodes={this.updateParkCodes}
          />
        }
      </div>   
    )
  }
}

export default ParkMap;
