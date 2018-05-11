import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import '../css/displayMenus.css';

class DisplayMenuItems extends Component {

  render() {
    return (
      <div className='display-menu'>
        {this.props.items.map((item) => {
          return(
            <div className='display-menu-item'>
              <Panel>
                <Panel.Heading>
                  <Panel.Title>
                    {item.name}
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  <p>Price: {item.price} </p>
                  <Button bsStyle='success'>
                    Add
                  </Button>
                </Panel.Body>
              </Panel>
            </div>
          )
        })
        }
      </div>
    )
  }
}

export default DisplayMenuItems
