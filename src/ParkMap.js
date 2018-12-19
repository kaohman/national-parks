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
          url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}{r}.{ext}'
	        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          subdomains='abcd'
          minZoom='0'
	        maxZoom='20'
	        ext='png'
        />
      </Map>
    )
  }
}

export default ParkMap;
