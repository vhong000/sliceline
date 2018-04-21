import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class DisplayMenuItems extends Component {
  render() {
    return (
      <div className='menuitem'>
        <div>
        <p>A Name</p>
        <p>A Price</p>
        <p>some desc</p>
        <Button>Update</Button>
        <Button>Remove</Button>
      </div>

      <div className='menuitem'>
        <p>A Name</p>
        <p>A Price</p>
        <p>some desc</p>
        <Button>Update</Button>
        <Button>Remove</Button>
      </div>

      <div className='menuitem'>
        <p>A Name</p>
        <p>A Price</p>
        <p>some desc</p>
        <Button>Update</Button>
        <Button>Remove</Button>
      </div>

      </div>
    )
  }
}

export default DisplayMenuItems
