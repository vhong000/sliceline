import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const style = {
	width: '50%',
	height: '50%'
}

export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      currentLocation: {
        lat: 40.8209339,
        lng: -73.9529155
      }
    }
  }

	//componentDidUpdate(prevProps, prevState) {
	//	if (prevProps.google !== this.props.google) {
	//		this.loadMap();
	//	}
	//}

  //componentDidMount() {
	//	if (this.props.centerAroundCurrentLocation) {
	//		if (navigator && navigator.geolocation) {
	//			navigator.geolocation.getCurrentPosition((pos) => {
	//				const coords = pos.coords;
	//				this.setState({
	//					currentLocation: {
	//						lat: coords.latitude,
	//						lng: coords.longitude
	//					}
	//				})
	//			})
	//		}
	//	}
  //}

  render() {
    return (
      <Map 
				google={this.props.google} 
				zoom={14}
				style={style}
				initialCenter={this.state.currentLocation}
			>
			<Marker 
				onClick={this.onMarkerClick}
				name={'Current Location'}
				position={this.state.currentLocation}
			/>

      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAp3yqFx2Z7gQKR-4RtDT2BbNQ6Wf7noLo'
})(MapContainer)
