import React, { Component } from 'react';
import { Button, Well, Tabs, Tab} from 'react-bootstrap';

class Reviews extends Component {
  render() {
    return(
      <div className="reviews">
        <Tabs>
          <Tab eventKey='restaurant' title='Restaurant Review'>
          </Tab>
          <Tab eventKey='food' title='Food Review'>
          </Tab>
          <Tab eventKey='delivery' title='Delivery Review'>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default Reviews
