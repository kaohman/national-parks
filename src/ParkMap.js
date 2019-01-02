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
      selectedPark: this.props.parks.find( park => park.urlCode === event.target.options.id)
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
  
  render() {
    let stateZoom = this.state.uniqueStateZoom[this.props.stateName] ? this.state.uniqueStateZoom[this.props.stateName] : 6;
    let greenIcon = new L.icon({
      iconUrl: './assets/marker-icon-green.png',
      shadowUrl: './assets/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    let violetIcon = new L.icon({
      iconUrl: './assets/marker-icon-violet.png',
      shadowUrl: './assets/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    let blueIcon = new L.icon({
      iconUrl: './assets/marker-icon-blue.png',
      shadowUrl: './assets/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    return (
     <div className="map-container">
        <Map id="map" center=
          { this.props.stateCoord.length > 0 ? this.props.stateCoord : this.state.position }
          zoom={this.props.stateCoord.length > 0 ? stateZoom : this.state.zoom }>
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
          {
            this.props.parks.map(park => {
              let lat = (park.latitude.includes('N')) ? park.latitude.replace(/.N$/, '') : park.latitude.replace(/.S$/, '').replace(/^/, '-');
              let lon = (park.longitude.includes('E')) ? park.longitude.replace(/.E$/, '') : park.longitude.replace(/.W$/, '').replace(/^/, '-');
              if (this.props.visitedParks.includes(park.urlCode)) {
                return (
                  <Marker position={[lat, lon]} icon={greenIcon} onClick={this.getPark} key={park.urlCode} id={park.urlCode}>
                    <Tooltip>{park.parkName}</Tooltip>
                  </Marker>
                )
              } else if (this.props.bucketListParks.includes(park.urlCode)) {
                return (
                  <Marker position={[lat, lon]} icon={violetIcon} onClick={this.getPark} key={park.urlCode} id={park.urlCode}>
                    <Tooltip>{park.parkName}</Tooltip>
                  </Marker>
                )
              } else {
                return (
                  <Marker position={[lat, lon]} icon={blueIcon} onClick={this.getPark} key={park.urlCode} id={park.urlCode}>
                    <Tooltip>{park.parkName}</Tooltip>
                  </Marker>
                )
              }
            })
          }
        </Map>
        {
          this.state.selectedPark && 
          <Park 
            removeCard={this.removeCard} 
            selectedPark={this.state.selectedPark}
            visitedParks={this.props.visitedParks}
            bucketListParks={this.props.bucketListParks}
            updateParkCodes={this.updateParkCodes}
          />
        }
      </div>   
    )
  }
}

export default ParkMap;
