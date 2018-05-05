import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCombos } from '../actions/menuActions.js';

class DisplayCombos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // placeholder menu
      predefined: [
        {
          price: 13,
          name: 'jumbo combo',
          crust: {
            name: 'fake crust',
          },
          top1: {
            name: 'pineapple',
          },
          drink: {
            name: 'pepsi',
          },
          appetizer: {
            name: 'sticks',
          },
        },
        {
          price: 15,
          name: 'wombo combo',
          crust: {
            name: 'real crust',
          },
          top1: {
            name: 'pepperoni',
          },
          top2: {
            name: 'chicken',
          },
          drink: {
            name: 'coke',
          },
          appetizer: {
            name: 'fries',
          },
        },
      ],
      menuitems: [ // array of items
        { 
          name: 'fake crust',
          price: 5,
          category: 'crust',
        },
        { 
          name: 'fake top1',
          price: 2,
          category: 'topping',
        },
        { 
          name: 'fake top2',
          price: 1,
          category: 'topping',
        },
        { 
          name: 'fake top3',
          price: 2,
          category: 'topping',
        },
        { 
          name: 'pepsi',
          price: 3,
          category: 'drink',
        },
        { 
          name: 'cheesestick',
          price: 4,
          category: 'appetizer',
        },
      ]
    }   
  }

  componentDidMount() {
    this.props.fetchCombos(4);
  }

  render() {
    return(
      <div className='display-combo'>
        {this.props.combos.map((combo, index) => {
          console.log(combo.name);
          return (
            <div key={index} className='display-combo-info'>
              <p>name: {combo.name}</p>
              <p>price: {combo.price}</p>
            </div>
          )
        }) 
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  combos: state.Menu.combos,
})

export default connect(mapStateToProps, { fetchCombos })(DisplayCombos);
