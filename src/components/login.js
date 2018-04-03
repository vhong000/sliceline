import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Button, Radio, ToggleButton, ButtonToolbar, ToggleButtonGroup } from 'react-bootstrap';
import sliceline_header from '../images/sliceline_header.jpg';
import '../css/login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      access: "customer",
    }
    this.handleChange = this.handleChange.bind(this);
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

  validateForm() {
    return this.state.email != "" && this.state.password != "";
  }

  render() {
    return (
      <div className='login'>
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
          <FormGroup controlId='email'>
            <ControlLabel>Email: </ControlLabel>
            <FormControl autoFocus bsSize='large' type='email' onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup controlId='password'>
            <ControlLabel>Password: </ControlLabel>
            <FormControl bsSize='large' type='password' onChange={this.handleChange}/>
          </FormGroup>
          <Button block disabled={!this.validateForm()} bsSize='large'>Login</Button>
         </form>
      </div>
    )
  }
}

export default Login;
