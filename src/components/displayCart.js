import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Panel, } from 'react-bootstrap';
import { removeFromCart } from '../actions/restaurantActions.js';

class DisplayCart extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='display-cart'>
        {this.props.cart.map((item, index) => {
          return(
          <div className='display-cart-item'>
            <Panel>
              <Panel.Heading>
                <Panel.Title>
                  {item.name}
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <p> Price: {item.price} </p>
                <Button bsStyle='danger'
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
  cart: state.Restaurant.cart,
})

export default connect(mapStateToProps, { removeFromCart })(DisplayCart);
