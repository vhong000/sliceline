import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Panel } from 'react-bootstrap';
import { fetchCombos } from '../actions/menuActions.js';
import { setActiveChef, addToCart, removeFromCart } from '../actions/restaurantActions.js';
import '../css/displayMenus.css';

class DisplayCombos extends Component {

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

DisplayCombos.Proptypes = {
  fetchCombos: PropTypes.func.isRequired,
  setActiveChef: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  chefs: PropTypes.array,
  activeChef: PropTypes.obj,
  combos: PropTypes.array,
  cart: PropTypes.array,
}  

const mapStateToProps = (state) => ({
  chefs: state.Restaurant.chefs,
  activeChef: state.Restaurant.activeChef,
  combos: state.Menu.combos,
})

export default connect(mapStateToProps, { fetchCombos, setActiveChef, addToCart, removeFromCart })(DisplayCombos);
