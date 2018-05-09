import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageHeader, Button, Well, } from 'react-bootstrap';
import Header from './header.js';
import '../css/checkout.css';

class Checkout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      total: '',
    }
  }

  render() {
    var newTotal = 0;
    return(
      <div className='checkout'>
        <Header/>
        <div className='checkout-body'>
          <PageHeader>
            Checkout
          </PageHeader>
          <div className='checkout-map'>
            {this.props.cart.map((item) => {
              newTotal = newTotal + parseInt(item.price);
              return(
                <div className='checkout-items'>
                <Well>
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </Well>
              </div>
            )})
            }
          </div>
          <p>Total: {newTotal}</p>
          <Button bsStyle='success'>
            Finalize Order
          </Button>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  cart: state.Restaurant.cart,
})

export default connect(mapStateToProps, null)(Checkout)
