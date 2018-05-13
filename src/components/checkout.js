import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageHeader, Button, Well, FormControl,
  ControlLabel,
} from 'react-bootstrap';
import Header from './header.js';
import { postOrder } from '../actions/restaurantActions.js';
import '../css/checkout.css';

class Checkout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
    }
    this.calculateTotal = this.calculateTotal.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  calculateTotal(sum) {
    var total = sum;
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

  handleAddressChange(event) {
    this.setState({
      address: event.target.value,
    })
  }

  handleSubmit(event) {
    const totalArry = this.props.cart.map((item) => {
      return parseInt(item.price);
    })
    const sum = totalArry.reduce((acc, curr) => {
      return acc + curr;
    })
    const total = this.calculateTotal(sum);
    const combos = this.props.cart.filter((combo) => {
      return combo.pk !== undefined;
    })
    const menu_ids = combos.map((combo) => {
      return combo.pk;
    })

    const item = {
      total: total,
      address: this.state.address,
      store_id: this.props.rest_id,
      menu_id: menu_ids.toString(),
      user_id: this.props.user_id,
    }

    this.props.postOrder(item);
  }

  //total
  //address
  //storeid
  //menuid

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
          <FormControl placeholder='Address' type='text'
            onChange={this.handleAddressChange}>
          </FormControl>
          <Button bsStyle='success'
            onClick={this.handleSubmit}>
            Finalize Order
          </Button>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  cart: state.Restaurant.cart,
  user_id: state.Authenticate.user.user_id,
  userStatus: state.Authenticate.status,
  chef_id: state.Restaurant.activeChef.emp_id,
  rest_id: state.Restaurant.restaurant.rest_id,
})

export default connect(mapStateToProps, { postOrder })(Checkout)
