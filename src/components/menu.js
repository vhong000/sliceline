import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel,
  Button, Row, Col, Tabs, Tab,
} from 'react-bootstrap';
import Header from './header.js';
import DisplayMenuItems from './displayMenuItems.js';

// MENU OBJECT
// {
//  id: 'int'
//  category: 'drink', 'pizza', 'snack'
//  name: 'string'
//  price: 'int'
//  description: 'string'
//  rating: 'int'
//  picture: 'string'
// }

class Menu extends Component {
  render() { 
    return(
      <div className='editmenu'>
        <Tabs>
          <Tab eventKey={1} title='Drinks'>
            <DisplayMenuItems/>
          </Tab>
          <Tab eventKey={2} title='Pizza'>
            <DisplayMenuItems/>
          </Tab>
          <Tab eventKey={3} title='Snacks'>
            <DisplayMenuItems/>
          </Tab>
        </Tabs>
     
      </div>
    )
  }
}

export default Menu
