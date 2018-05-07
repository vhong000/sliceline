import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { Row, Col, 
} from 'react-bootstrap';
import Header from './header.js';
import Sidebar from './sidebar.js';
import { fetchAllRestaurants } from '../actions/restaurantActions.js';
import { GoogleApiWrapper } from 'google-maps-react';
import MapContainer from './map.js'
import '../css/App.css';

class Main extends Component {

  componentDidMount() {
    this.props.fetchAllRestaurants()
  }

  render() {
    return (
      <div className='app'>
        <div className='app-header'>
          <Header/>
        </div>
        <div className='app-sidebar'>
          <Sidebar/>
        </div>
        <div className='app-body'>
          <div className='app-map-outer'>
            <div className='app-map'>
              <MapContainer/>
            </div>
          </div>
          <div className='app-recommend'>
            <div className='app-option'>
              <h3>iPizzaNY</h3>
            </div>
            <div className='app-option'>
              <h3>Olga's Pizza</h3>
            </div>
            <div className='app-option'>
              <h3>Papa John's Pizza</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userData: state.Authenticate.user,
  locations: state.Restaurant.restaurants,
})


export default connect(mapStateToProps, { fetchAllRestaurants })(Main);
