import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRestaurant } from '../actions/restaurantActions.js';
import { Button, Nav, NavItem } from 'react-bootstrap';

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchRestaurant()
  } 

  render() {
    return (
      <div className="sidebar">
        <Nav bsStyle='pills' stacked>
          {this.props.locations.map((elements, index) => (
            <NavItem eventKey={index} href={`/restaurant/${elements.rest_id}`}>
              {elements.name}
            </NavItem>
          ))} 
        </Nav>
      </div>
    )
  }
}

Sidebar.propTypes = {
  fetchRestaurant: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  locations: state.Restaurant.restaurants,
  error: state.Restaurant.error,
  isLoading: state.Restaurant.loading,
})

export default connect(mapStateToProps, { fetchRestaurant })(Sidebar);

