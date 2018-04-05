import React, { Component } from 'react';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: ['test', 'tes1', 'test2'],
    }
  }

  render() {
    return (
      <div className="sidebar">
        {this.state.locations.map((elements) => (
          <div className="sidebar-locations">
            <h4>{elements}</h4>
          </div>
        ))} 
      </div>
    )
  }
}

export default Sidebar;

