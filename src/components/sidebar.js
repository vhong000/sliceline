import React, { Component } from 'react';
import { allRestaurants } from '../fetchData.js';
import { Button } from 'react-bootstrap';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
    }
  }

  componentDidMount() {
    allRestaurants().then((restaurants) => {
      this.setState({
        locations: restaurants,
      })
    })
  } 

  render() {
    return (
      <div className="sidebar">
        {this.state.locations.map((elements, index) => (
          <div className="sidebar-locations">
            <h4>{elements.name}</h4>
          </div>
        ))} 
      </div>
    )
  }
}

export default Sidebar;

