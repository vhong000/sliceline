import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Map, Marker, GoogleApiWrapper, withScriptjs, GoogleMap, withGoogleMap, 
//} from 'google-maps-react';
//import { DirectionsRenderer } from 'react-google-maps';
//import { compose } from 'redux';
//import { , withProps, lifecycle } from 'recompose';

const style = {
  width: '100%',
  height: '100%'
}
const { compose, withProps, lifecycle } = require("recompose");
const {
	withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

export const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const google = window.google;
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: new google.maps.LatLng(this.props.origin.lat, this.props.origin.lng),
        destination: new google.maps.LatLng(this.props.dest.lat, this.props.dest.lng),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={10}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);

//export class MapWithADirectionsRenderer extends Component {
//  constructor(props) {
//    super(props);
//    this.state = {
//      currentLocation: {
//        lat: 40.8209339,
//        lng: -73.9529155,
//      },
//      restLocation: {
//        lat: 40.823650,
//				lng: -73.944299,
//      },
//    }
//    this.fetchDistance = this.fetchDistance.bind(this);
//  }
//
//  fetchDistance(location) {
//    const currLocation = this.state.currentLocation.lat + ',' + this.state.currentLocation.lng;
//    const destination = location.latitude + ',' + location.longitude;
//    return fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${currLocation}&destinations=${destination}&key=AIzaSyAp3yqFx2Z7gQKR-4RtDT2BbNQ6Wf7noLo`, {
//      method: "GET",
//    }).then((response) => { 
//      return response.json(); 
//    })
//  }
//		
//	componentDidMount() {
//		const google = this.props.google;
//		const DirectionsService = new google.maps.DirectionsService();
//
//		DirectionsService.route({
//			origin: new google.maps.LatLng(40.8209339, -73.9529155),
//			destination: new google.maps.LatLng(40.823650, -73.944299),
//			travelMode: google.maps.TravelMode.DRIVING,
//		}, (result, status) => {
//			if (status === google.maps.DirectionsStatus.OK) {
//				this.setState({
//					directions: result,
//				});
//			} else {
//				console.error(`error fetching directions ${result}`);
//			}
//		});
//	}
//
//
//  render() {
//    return(
//      <GoogleMap
//        google={this.props.google}
//        zoom={15}
//        style={style}
//        initialCenter={this.state.currentLocation}
//        directions={this.state.directions}
//      >
//
//
//      <Marker
//        onClick={this.onMarkerClick}
//        title={'Current Location'}
//        position={this.state.currentLocation}
//      />
//      <Marker
//        onClick={this.onMarkerClick}
//        title={'Rest Location'}
//        position={this.state.restLocation}
//      />
//
//			<DirectionsRenderer directions={this.props.directions}/>
//
//      </GoogleMap>
//    )
//  }
//}
//
//const mapStateToProps = state => ({
//  locations: state.Restaurant.restaurants,
//})
//
//const wrappedContainer = GoogleApiWrapper({
//  apiKey: 'AIzaSyAp3yqFx2Z7gQKR-4RtDT2BbNQ6Wf7noLo',
//})(MapWithADirectionsRenderer)
//
//export default connect(mapStateToProps, null)(wrappedContainer)
