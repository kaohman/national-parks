import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import Park from './Park.js';
import Button from './Button.js';

class ParkMap extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    const position = [37.0902, -95.7129];
    const zoom = 4;
    return (
      <Map center={position} zoom={zoom}>
        <TileLayer 
          url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}'
          attribution='Tiles &copy; Esri &mdash; Source: US National Park Service'
          maxZoom='8'
        />
        <TileLayer 
          url='https://korona.geog.uni-heidelberg.de/tiles/adminb/x={x}&y={y}&z={z}'
          maxZoom='19'
	        attribution='Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
      </Map>
    )
  }
}

export default ParkMap;
