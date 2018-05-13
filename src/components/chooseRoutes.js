import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { GoogleApiWrapper } from 'google-maps-react';
import { MapWithADirectionsRenderer } from './mapWithADirectionsRenderer.js';
import { fetchDeliveryOrder } from '../actions/restaurantActions.js';

class ChooseRoutes extends Component {

  componentDidMount() {
    this.props.fetchDeliveryOrder(this.props.emp_id);
  }

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
  },
  emp_id: state.Authenticate.user.emp_id,
  activeOrder: state.Authenticate.activeOrder,
})

export default connect(mapStateToProps, { fetchDeliveryOrder })(ChooseRoutes);
