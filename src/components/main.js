import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { Row, Col, 
} from 'react-bootstrap';
import Header from './header.js';
import Sidebar from './sidebar.js';
import { fetchRestaurant } from '../actions/restaurantActions.js';
import { GoogleApiWrapper } from 'google-maps-react';
import MapContainer from './mapContainer.js'
import '../css/App.css';

class Main extends Component {

  componentDidMount() {
    this.props.fetchRestaurant()
  }

  render() {
    return (
      <div className='app'>
        <div className='app-header'>
          <Header/>
        </div>
        <div className='app-body'>
          <div className='app-sidebar'>
            <Sidebar/>
          </div>
          <div className='app-map'>
						<MapContainer locations={this.props.locations} google={this.props.google}/>
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

const wrappedContainer = GoogleApiWrapper({
  apiKey: 'AIzaSyAp3yqFx2Z7gQKR-4RtDT2BbNQ6Wf7noLo',
})(Main);

export default connect(mapStateToProps, { fetchRestaurant })(wrappedContainer);
