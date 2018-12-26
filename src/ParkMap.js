import React, { Component } from 'react';
import { Map, Marker, Tooltip, TileLayer } from 'react-leaflet';
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
            url='https://korona.geog.uni-heidelberg.de/tiles/adminb/x={x}&y={y}&z={z}'
            attribution='Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            maxZoom='8'
          />
          {
            this.props.parks.map(park => {
              let lat = (park.latitude.includes('N')) ? park.latitude.replace(/.N$/, '') : park.latitude.replace(/.S$/, '').replace(/^/, '-');
              let lon = (park.longitude.includes('E')) ? park.longitude.replace(/.E$/, '') : park.longitude.replace(/.W$/, '').replace(/^/, '-');
              return(
                <Marker position={[lat, lon]} onClick={this.getPark} key={park.urlCode} id={park.urlCode}>
                  <Tooltip>{park.parkName}</Tooltip>
                </Marker>
              )
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
