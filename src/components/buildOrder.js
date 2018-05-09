import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel,
  Button, Row, Col, Tabs, Tab, ProgressBar,
} from 'react-bootstrap';
import Header from './header.js';
import DisplayMenuItems from './displayMenuItems.js';
import { fetchMenuItems } from '../actions/menuActions.js';

class BuildOrder extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      progress: 16.666,
    }
    this.handleSelected = this.handleSelected.bind(this);
  }

  componentDidMount() {
    this.props.fetchMenuItems();
  }

  handleSelected(key) {
    const newProgress = key * 16.666;
    this.setState({
      progress: newProgress,
    })
  }

  render() { 
    // make isLoading component
      return(
        <div className='editmenu'>
            <ProgressBar bsStyle='warning' striped active now={this.state.progress}/>
          <Tabs justified onSelect={this.handleSelected}>
            <Tab eventKey={1} title='Crust'>
              <DisplayMenuItems items={this.props.crusts}/>
            </Tab>
            <Tab eventKey={2} title='Topping 1'>
              <DisplayMenuItems items={this.props.toppings}/>
            </Tab>
            <Tab eventKey={3} title='Topping 2'>
              <DisplayMenuItems items={this.props.toppings}/>
            </Tab>
            <Tab eventKey={4} title='Topping 3'>
              <DisplayMenuItems items={this.props.toppings}/>
            </Tab>
            <Tab eventKey={5} title='Drinks'>
              <DisplayMenuItems items={this.props.drinks}/>
            </Tab>
            <Tab eventKey={6} title='Appetizers'>
              <DisplayMenuItems items={this.props.appetizers}/>
            </Tab>
          </Tabs>
       
        </div>
      )
  }
}

BuildOrder.propTypes = {
  isLoading: PropTypes.bool,
  fetchMenuItems: PropTypes.func.isRequired,
  drinks: PropTypes.array,
  crusts: PropTypes.array,
  toppings: PropTypes.array,
  appetizers: PropTypes.array,
}

const mapStateToProps = state => ({
  isLoading: state.Menu.loading,
  drinks: state.Menu.drinks,  
  crusts: state.Menu.crusts,
  toppings: state.Menu.toppings,
  appetizers: state.Menu.appetizers,
})

export default connect(mapStateToProps, { fetchMenuItems })(BuildOrder)
