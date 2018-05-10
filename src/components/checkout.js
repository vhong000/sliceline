import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageHeader, Button, Well, FormControl,
  ControlLabel,
} from 'react-bootstrap';
import Header from './header.js';
import '../css/checkout.css';

class Checkout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      total: '',
      address: '',
    }
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  calculateTotal(sum) {
    var total = 0;
    switch (this.props.userStatus) {
      case 'Customer':
        total = sum * .9;
        return total;
      case 'VIP':
        total = sum * .85;
        return total;
      default:
        return total;
    }
  }

  render() {
    var sum = 0;
    return(
      <div className='checkout'>
        <Header/>
        <div className='checkout-body'>
          <PageHeader>
            Checkout
          </PageHeader>
          <div className='checkout-map'>
            {this.props.cart.map((item) => {
              sum = sum + parseInt(item.price);
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
          <p>Total: {sum}</p>
          <p>Discounted Total: {this.calculateTotal(sum)}</p>
          <FormControl placeholder='Address' type='text'>
          </FormControl>
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
  userStatus: state.Authenticate.status,
  chef_id: state.Restaurant.activeChef.emp_id,
})

export default connect(mapStateToProps, null)(Checkout)
