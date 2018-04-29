import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel,
  Button, ToggleButton, ButtonToolbar, ToggleButtonGroup,
  Collapse, Panel, Label, Well, Row, Col, Alert, Image
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchRestaurant } from '../actions/restaurantActions.js';
import { signupEmployee, signupCustomer } from '../fetchData.js';
import sliceline_header from '../images/sliceline_header.jpg';
import '../css/login_signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicant: {
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        phone: "",
        birthday: "",
        address: "",
        city: "",
        state: "NY",
        zipcode: "",
        ssn: "",
        access_code: "", 
        store_id: '',
        rest_ids: [],
      },
      access: 'customer',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleAccessChange = this.handleAccessChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRestSelect = this.handleRestSelect.bind(this)
  }

  componentDidMount() {
    this.props.fetchRestaurant();
  }

  handleChange(event) {
    this.setState({
      applicant: {
        ...this.state.applicant,
        [event.target.id]: event.target.value,
      }
    })
  }

  handleRestSelect(event) {
    this.setState({
      applicant: {
        ...this.state.applicant,
        rest_ids: event,
      }
    })
  }

  handleAccessChange(event) {
    this.setState({
      access: event.target.value,
    })
  }

  handleSubmit(event) {
    const final = this.state.applicant;
    const final_ids = this.state.applicant.rest_ids;
    if (this.state.access === 'employee') {
      delete final.rest_ids
      console.log(JSON.stringify(final));
      signupEmployee(final, this.props.show).catch((error) => {
        this.setState({
          error: error,
        })
      }); 
    } else {
      final.store_id = final_ids;
      delete final.ssn;
      delete final.access_code;
      delete final.rest_ids;
      console.log(JSON.stringify(final));
      signupCustomer(final, this.props.show).catch((error) => {
        this.setState({
          error: error,
        })
      });
    }
  }

  render() {
    return (
      <div className='signup'>
        <header className='login-header'>   
          <Link to='/'>
            <Image src={sliceline_header} className='login-header-logo' alt='main'/>
          </Link>
        </header>

        <form>
          <ButtonToolbar>
            <ToggleButtonGroup type='radio' name='access' defaultValue='customer' justified>
              <ToggleButton name='access' value='customer' onChange={(event) => this.handleAccessChange(event, true)}>
                Customer
              </ToggleButton>
              <ToggleButton name='access' value='employee' onChange={(event) => this.handleAccessChange(event, true)}>
                Employee
              </ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
          <br></br>

          <Collapse unmountOnExit mountOnEnter in={this.state.access !== 'customer'} >
            <Row>
              <Col xs={3}>
                <FormGroup controlId='access_code'>
                  <ControlLabel>Access Code: </ControlLabel>
                  <FormControl type='text' onChange={this.handleChange}/>
                </FormGroup>
              </Col>
              <Col xs={3}>
                <FormGroup controlId='store_id'>
                  <ControlLabel>Store Code: </ControlLabel>
                  <FormControl type='text' onChange={this.handleChange}/>
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup controlId='ssn'>
                  <ControlLabel>SSN: </ControlLabel>
                  <FormControl type='text' onChange={this.handleChange}/>
                </FormGroup>
              </Col>
            </Row>
          </Collapse>

          <FormGroup controlId='email'>
            <ControlLabel>Email: </ControlLabel>
            <FormControl autoFocus bsSize='large' type='email' onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup controlId='password'>
            <ControlLabel>Password: </ControlLabel>
            <FormControl bsSize='large' type='password' onChange={this.handleChange}/>
          </FormGroup>
          
          <Row>
            <Col xs={6}>
              <FormGroup controlId='first_name'>
                <ControlLabel>First Name: </ControlLabel>
                <FormControl bsSize='lg' type='text' onChange={this.handleChange}/>
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup controlId='last_name'>
                <ControlLabel>Last Name: </ControlLabel>
                <FormControl bsSize='lg' type='text' onChange={this.handleChange}/>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={6}>
              <FormGroup controlId='phone'>
                <ControlLabel>Phone Number: </ControlLabel>
                <FormControl type='text' onChange={this.handleChange}/>
              </FormGroup>
            </Col>
            <FormGroup controlId='birthday'>
              <Col xs={6}>
                <ControlLabel>Date of Birth:</ControlLabel>
                <FormControl type='text' placeholder='mm/dd/yyyy' onChange={this.handleChange}/>
              </Col>
            </FormGroup>
          </Row>

          <Row className='signup-address'>
            <Col xs={5}>
              <FormGroup controlId='address'>
                <ControlLabel>Street Address: </ControlLabel>
                <FormControl type='text' onChange={this.handleChange}/>
              </FormGroup>
            </Col>

            <Col xs={3}>
              <FormGroup controlId='city'>
                <ControlLabel>City: </ControlLabel>
                <FormControl type='text' onChange={this.handleChange}/>
              </FormGroup>
            </Col>

            <Col xs={2}>
              <FormGroup controlId='state'>
                <ControlLabel>State: </ControlLabel>
              <FormControl componentClass="select" defaultValue='NY' onChange={this.handleChange}>
                 <option value="AL">AL</option>
                  <option value="AK">AK</option>
                  <option value="AR">AR</option>  
                  <option value="AZ">AZ</option>
                  <option value="CA">CA</option>
                  <option value="CO">CO</option>
                  <option value="CT">CT</option>
                  <option value="DC">DC</option>
                  <option value="DE">DE</option>
                  <option value="FL">FL</option>
                  <option value="GA">GA</option>
                  <option value="HI">HI</option>
                  <option value="IA">IA</option>  
                  <option value="ID">ID</option>
                  <option value="IL">IL</option>
                  <option value="IN">IN</option>
                  <option value="KS">KS</option>
                  <option value="KY">KY</option>
                  <option value="LA">LA</option>
                  <option value="MA">MA</option>
                  <option value="MD">MD</option>
                  <option value="ME">ME</option>
                  <option value="MI">MI</option>
                  <option value="MN">MN</option>
                  <option value="MO">MO</option>  
                  <option value="MS">MS</option>
                  <option value="MT">MT</option>
                  <option value="NC">NC</option>  
                  <option value="NE">NE</option>
                  <option value="NH">NH</option>
                  <option value="NJ">NJ</option>
                  <option value="NM">NM</option>      
                  <option value="NV">NV</option>
                  <option value="NY">NY</option>
                  <option value="ND">ND</option>
                  <option value="OH">OH</option>
                  <option value="OK">OK</option>
                  <option value="OR">OR</option>
                  <option value="PA">PA</option>
                  <option value="RI">RI</option>
                  <option value="SC">SC</option>
                  <option value="SD">SD</option>
                  <option value="TN">TN</option>
                  <option value="TX">TX</option>
                  <option value="UT">UT</option>
                  <option value="VT">VT</option>
                  <option value="VA">VA</option>
                  <option value="WA">WA</option>
                  <option value="WI">WI</option>  
                  <option value="WV">WV</option>
                  <option value="WY">WY</option>
                </FormControl>
              </FormGroup>
            </Col>

            <Col xs={2}>
              <FormGroup controlId='zipcode'>
                <ControlLabel>Zip Code: </ControlLabel>
                <FormControl type='text' onChange={this.handleChange}/>
              </FormGroup>
            </Col>
          </Row>
          <br></br>

          <Collapse unmountOnExit mountOnEnter in={this.state.access === 'customer'}>
            <ToggleButtonGroup type='checkbox' vertical block onChange={this.handleRestSelect}>
            <ControlLabel>Choose Restaurants</ControlLabel>
            {/*
              <ToggleButton>All Restaurants</ToggleButton>
              */}
              {this.props.allRestaurants.map((elements) => (
                <ToggleButton value={elements.rest_id} >
                  {elements.name}
                </ToggleButton>
              ))
              }
            </ToggleButtonGroup>
          </Collapse>
          <br></br>

          {this.state.error ? (
            <Alert bsStyle='danger'>{this.state.error.message}</Alert>
          ) : ( null )
          }

          <Button block bsStyle='primary' 
            bsSize='large' onClick={this.handleSubmit}>
            Sign Up
          </Button>
          
        </form>
      </div>
    )
  }
}

Signup.propTypes = {
  fetchRestaurant: PropTypes.func.isRequired,
  allRestaurants: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  allRestaurants: state.Restaurant.restaurants
})

export default connect(mapStateToProps, { fetchRestaurant })(Signup);
