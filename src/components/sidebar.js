import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
//import { fetchRestaurant } from '../actions/restaurantActions.js';
import { Button, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import spinner from '../images/spinner.svg';
import '../css/sidebar.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div>
          <img src={spinner}/>
        </div>
      )
    } else {
      return (
        <div className="sidebar">
          <Nav bsStyle='pills' stacked>
            {this.props.locations.map((elements, index) => (
              <LinkContainer to={`/restaurant/${elements.rest_id}`}>
                <NavItem eventKey={index}>
                  <Glyphicon glyph='chevron-right'/> {elements.name}
                </NavItem>
              </LinkContainer>
            ))} 
          </Nav>
        </div>
      )
    }
  }
}

Sidebar.propTypes = {
  locations: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  error: state.Restaurant.error,
  locations: state.Restaurant.restaurants,
  isLoading: state.Restaurant.loading,
})

export default connect(mapStateToProps, null)(Sidebar);

