import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Panel, } from 'react-bootstrap';
import { removeFromCart } from '../actions/restaurantActions.js';

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

  componentWillReceiveProps(nextProps) {
    if (this.props.cart !== nextProps.cart) {
      this.setState({
        cart: nextProps.cart,
      })
    }
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
        <LinkContainer to='/checkout'>
          <Button bsStyle='success'>
            Checkout
          </Button>
        </LinkContainer>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.Restaurant.cart,
})

export default connect(mapStateToProps, { removeFromCart })(DisplayCart);
