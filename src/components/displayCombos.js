import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Panel } from 'react-bootstrap';
import { fetchCombos } from '../actions/menuActions.js';
import { setActiveChef, addToCart, removeFromCart } from '../actions/restaurantActions.js';
import '../css/displayCombos.css';

class DisplayCombos extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    if( this.props.activeChef !== '' ) {
      return(
        <div className='display-combo'>
          <div className='display-combo-menu'>
            {this.props.combos.map((combo, index) => {
              return(
              <Panel>
                <Panel.Heading>
                  <Panel.Title>
                    {combo.name}
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  <p> Price: {combo.price} </p>
                  <Button bsStyle='success'
                    onClick={()=> this.props.addToCart(combo)}>
                    Add to Cart
                  </Button>
                  <Button bsStyle='danger'
                    onClick={()=> this.props.removeFromCart(combo.name)}>
                    Remove
                  </Button>
                </Panel.Body>
              </Panel>
              )
            })}
          </div>
        </div>
      )
    } else {
      return(
      <div className='display-combo'>
        <h3>Select Chef</h3>
        <div className='display-combo-chefs'>
          {this.props.chefs.map((chef, index) => { // get chef names
            return(
              <Panel>
                <Panel.Heading>
                  <Panel.Title>
                    Chef {chef.emp_id}
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  <Button bsSize='lg'
                    bsStyle='success'
                    onClick={()=> this.props.setActiveChef(chef)}>
                    SELECT
                  </Button>
                </Panel.Body>
              </Panel>
            )
          })}
        </div>
      </div>
      )
    }
  }
}
const mapStateToProps = state => ({
  chefs: state.Restaurant.chefs,
  activeChef: state.Restaurant.activeChef,
  combos: state.Menu.combos,
  cart: state.Restaurant.cart,
})

export default connect(mapStateToProps, { fetchCombos, setActiveChef, addToCart, removeFromCart })(DisplayCombos);
