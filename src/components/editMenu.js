import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Panel } from 'react-bootstrap';
import { fetchCombos } from '../actions/menuActions.js';

class EditMenu extends Component {

  componentDidMount() {
    this.props.fetchCombos(this.props.chef_id);
  }

  render() {
    return(
      <div className='editmenu'>
        <div className='editmenu-item'>
        {this.props.combos.map((item) => {
          return(
          <Panel>
            <Panel.Heading>
              <Panel.Title>
                {item.name}
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <p> Crust: {item.crust} </p>
              <p> Toppings: {item.toppings} </p>
              <p> Drink: {item.drinks} </p>
              <p> Appetizer: {item.appetizers} </p>
              <p> Rating: {item.rating} </p>
              <p> Description: {item.description} </p>
              <p> Price: {item.price} </p>
              <Button bsStyle='success'>
                Update
              </Button>
              <Button bsStyle='danger'>
                Remove
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

const mapStateToProps = state => ({
  chef_id: state.Authenticate.user.emp_id,
  combos: state.Menu.combos,
})

export default connect(mapStateToProps, { fetchCombos })(EditMenu);
