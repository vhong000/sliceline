import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleApiWrapper } from 'google-maps-react';
import { MapWithADirectionsRenderer } from './mapWithADirectionsRenderer.js';

class ChooseRoutes extends Component {

  render() {
    return(
			<div className='chooseroutes'>
				<div className='directions-map'>
          <MapWithADirectionsRenderer origin={this.props.rest_coords}
            dest={{lat: 40.8209339, lng: -73.9529155}}/>
				</div>
			</div>
    )
  }
}

const mapStateToProps = state => ({
  rest_coords: {
    lat: parseFloat(state.Restaurant.restaurant.latitude),
    lng: parseFloat(state.Restaurant.restaurant.longitude),
  }
})

export default connect(mapStateToProps, null)(ChooseRoutes);
