import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Panel, } from 'react-bootstrap';
import { removeFromCart } from '../actions/restaurantActions.js';
import '../css/displayCart.css';

class DisplayCart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    }
  }

  componentDidMount() {
    this.setState({
      cart: this.props.cart,
    })
  }

  //componentWillReceiveProps(nextProps) {
  //  if (this.props.cart !== nextProps.cart) {
  //    this.setState({
  //      cart: nextProps.cart,
  //    })
  //  }
  //}

  render() {
    
    if (this.props.cart.length === 0) {
      return(
        <div className='display-cart'>
          <h3>The cart is empty</h3>
        </div>
      )
    } else {
      return(
        <div className='display-cart'>
          <div className='display-cart-map'>
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
          <LinkContainer to='/checkout'>
            <Button block bsStyle='success'>
              Checkout
            </Button>
          </LinkContainer>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  cart: state.Restaurant.cart,
})

export default connect(mapStateToProps, { removeFromCart })(DisplayCart);
