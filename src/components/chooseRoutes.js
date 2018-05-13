import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Label, Modal, } from 'react-bootstrap';
import { GoogleApiWrapper } from 'google-maps-react';
import { MapWithADirectionsRenderer } from './mapWithADirectionsRenderer.js';
import ReviewForm from './reviewForm.js';
import { fetchDeliveryOrder } from '../actions/restaurantActions.js';

class ChooseRoutes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    }
    this.handleDeliver = this.handleDeliver.bind(this);
  }

  componentDidMount() {
    this.props.fetchDeliveryOrder(this.props.emp_id);
  }

  handleDeliver() {
    const newState = !this.state.showForm;
    this.setState({
      showForm: newState,
    })
  }

  render() {
    if (this.props.activeOrder) {
      return(
      <div className='chooseroutes'>
        <div className='chooseroutes-info'>
          <p><Label>Address:</Label> {this.props.activeOrder.address}</p>
        </div>
        <div className='chooseroutes-map'>
          <MapWithADirectionsRenderer origin={this.props.rest_coords}
            dest={{lat: 40.8209339, lng: -73.9529155}}/>
        </div>
        <Button onClick={this.handleDeliver}>
          Deliver Order
        </Button>

        <Modal show={this.state.showForm}>
          <ReviewForm reviewer='delivery' callback={this.handleDeliver}/>
        </Modal>
      </div>
      )
    } else {
      return(
      <div className='chooseroutes'>
        <h3>No Active Orders</h3>
      </div>
      )
    }
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
