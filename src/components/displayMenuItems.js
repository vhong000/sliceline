import React, { Component } from 'react';
import { Button, ButtonGroup, FormControl, Row, Col } from 'react-bootstrap';

// need to fetch get all menu items
class DisplayMenuItems extends Component {
  render() {
    return (
      <div className='menuitem'>
        <div>
          <p>A Name</p>
          <p>A Price</p>
          <p>some desc</p>

          {this.props.access === 'chef' ? (
            <div>
              <ButtonGroup>
                <Button bsStyle='primary'>Update</Button>
                <Button bsStyle='danger'>Remove</Button>
              </ButtonGroup>
            </div>
          ) : (
            <Row>
              <Col xs={6}>
                <FormControl type='number'/>
              </Col>
              <Col xs={6}>
                <Button>Add to Cart</Button>
              </Col>
            </Row>
          )}
        </div>

      </div>
    )
  }
}

export default DisplayMenuItems
