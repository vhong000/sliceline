import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel,
  Button, Row, Col, Tabs, Tab, ProgressBar,
} from 'react-bootstrap';
import Header from './header.js';
import DisplayMenuItems from './displayMenuItems.js';

// MENU OBJECT
// {
//  id: 'int'
//  category: 'crust', 'topping', 'appetizer', 'drink'
//  name: 'string'
//  price: 'int'
//  description: 'string'
//  rating: 'int'
//  picture: 'string'
// }

class Menu extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      progress: 16.6,
    }
    this.handleSelected = this.handleSelected.bind(this);
  }

  handleSelected(key) {
    const newProgress = key * 16.666;
    this.setState({
      progress: newProgress,
    })
  }

  render() { 
    return(
      <div className='editmenu'>
          <ProgressBar bsStyle='warning' striped active now={this.state.progress}/>
        <Tabs justified onSelect={this.handleSelected}>
          <Tab eventKey={1} title='Crust'>
            <DisplayMenuItems access='chef'/>
          </Tab>
          <Tab eventKey={2} title='Topping 1'>
            <DisplayMenuItems/>
          </Tab>
          <Tab eventKey={3} title='Topping 2'>
            <DisplayMenuItems/>
          </Tab>
          <Tab eventKey={4} title='Drinks'>
            <DisplayMenuItems/>
          </Tab>
          <Tab eventKey={5} title='Appetizers'>
          </Tab>
          <Tab eventKey={6} title='Checkout'>
            <Button bsStyle='success'>Checkout</Button>
          </Tab>
        </Tabs>
     
      </div>
    )
  }
}

export default Menu
