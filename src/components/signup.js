import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Button, ToggleButton, ButtonToolbar, ToggleButtonGroup } from 'react-bootstrap';
import { Collapse } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import sliceline_header from '../images/sliceline_header.jpg';
import '../css/login_signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      phonenum: "",
      dob: {
        month: 'January',
        day: '1',
        year: '',
      },
      address: "",
      city: "",
      state: "NY",
      zipcode: "",
      ssn: "",
      access: "customer",
      accessID: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleDobChange = this.handleDobChange.bind(this)
  }

  handleChange(event, isRadio) {
    isRadio ? (
      this.setState({
        access: event.target.value,
      })
    ) : (
      this.setState({
        [event.target.id]: event.target.value,
      })
    )
  }

  handleDobChange(event) {
    const name = event.target.name;
    const newdob = this.state.dob;
    newdob[name] = event.target.value;
    this.setState({
      dob: newdob,
    })
  }

  render() {
    return (
      <div className='signup'>
        <header className='login-header'>   
          <img src={sliceline_header} className='login-header-logo' alt='main'/>
        </header>

        <form>
          <ButtonToolbar>
            <ToggleButtonGroup type='radio' name='access' defaultValue='customer' justified>
              <ToggleButton name='access' value='customer' onChange={(event) => this.handleChange(event, true)}>
                Customer
              </ToggleButton>
              <ToggleButton name='access' value='manager' onChange={(event) => this.handleChange(event, true)}>
                Manager
              </ToggleButton>
              <ToggleButton name='access' value='cook' onChange={(event) => this.handleChange(event, true)}>
                Cook
              </ToggleButton>
              <ToggleButton name='access' value='delivery' onChange={(event) => this.handleChange(event, true)}>
                Delivery
              </ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
          <br></br>

          <Collapse unmountOnExit mountOnEnter in={this.state.access !== 'customer'} >
            <Row>
              <Col xs={6}>
                <FormGroup controlId='accessID'>
                  <ControlLabel>Access ID: </ControlLabel>
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
              <FormGroup controlId='firstname'>
                <ControlLabel>First Name: </ControlLabel>
                <FormControl bsSize='lg' type='text' onChange={this.handleChange}/>
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup controlId='lastname'>
                <ControlLabel>Last Name: </ControlLabel>
                <FormControl bsSize='lg' type='text' onChange={this.handleChange}/>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={4}>
              <FormGroup controlId='phonenum'>
                <ControlLabel>Phone Number: </ControlLabel>
                <FormControl type='text' onChange={this.handleChange}/>
              </FormGroup>
            </Col>
            <Col xs={1} >
              <br></br>
              <h4>DoB:</h4>
            </Col>
            <FormGroup controlId='dob'>
              <Col xs={3}>
                <ControlLabel>Month: </ControlLabel>
                <FormControl name='month' componentClass="select" onChange={this.handleDobChange}>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </FormControl>
              </Col>
              <Col xs={2}>
                <ControlLabel>Day: </ControlLabel>
                <FormControl name='day' componentClass="select" onChange={this.handleDobChange}>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                  <option value='11'>11</option>
                  <option value='12'>12</option>
                  <option value='13'>13</option>
                  <option value='14'>14</option>
                  <option value='15'>15</option>
                  <option value='16'>16</option>
                  <option value='17'>17</option>
                  <option value='18'>18</option>
                  <option value='19'>19</option>
                  <option value='20'>20</option>
                  <option value='21'>21</option>
                  <option value='22'>22</option>
                  <option value='23'>23</option>
                  <option value='24'>24</option>
                  <option value='25'>25</option>
                  <option value='26'>26</option>
                  <option value='27'>27</option>
                  <option value='28'>28</option>
                  <option value='29'>29</option>
                  <option value='30'>30</option>
                  <option value='31'>31</option>
                </FormControl>
              </Col>
              <Col xs={2}>
                <ControlLabel>Year: </ControlLabel>
                <FormControl name='year' type='text' onChange={this.handleDobChange}/>
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

          <Button block bsStyle='primary' bsSize='large'>Sign Up</Button>
          
        </form>
      </div>
    )
  }
}

export default Signup;