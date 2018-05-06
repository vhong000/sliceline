import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import pizza_marker from '../images/pizza_marker.png';
import { connect } from 'react-redux';

const style = {
  width: '85%',
  height: '50%'
}

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        lat: 40.8209339,
        lng: -73.9529155,
      }
    }
  }

  render() {
		var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

    return(
      <Map
        google={this.props.google}
        zoom={15}
        style={style}
        initialCenter={this.state.currentLocation}
      >

      <Marker
        onClick={this.onMarkerClick}
        title={'Current Location'}
        position={this.state.currentLocation}
      />

    {this.props.locations.map((location) => {
      return(
        <Marker
          title={location.name}
          position={{
            lat: parseFloat(location.latitude),
            lng: parseFloat(location.longitude)
          }}
          icon={pizza_marker}
        />
      )
    })
    }

      </Map>
    )
  }
}

const mapStateToProps = state => ({
  locations: state.Restaurant.restaurants,
})

const wrappedContainer = GoogleApiWrapper({
  apiKey: 'AIzaSyAp3yqFx2Z7gQKR-4RtDT2BbNQ6Wf7noLo',
})(MapContainer);

export default connect(mapStateToProps, null)(wrappedContainer)
