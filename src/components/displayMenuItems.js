import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Panel } from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/restaurantActions.js';
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
                  <p>Type: {item.type} </p>
                  <p>Price: {item.price} </p>
                  <Button 
                    bsStyle='success'
                    onClick={()=> this.props.addToCart(item)}>
                    Add
                  </Button>
                  <Button 
                    bsStyle='danger'
                    onClick={()=> this.props.removeFromCart(item.name)}>
                    Remove
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

const mapStateToProps = state => ({
  
})

export default connect(mapStateToProps, { addToCart, removeFromCart })(DisplayMenuItems);
