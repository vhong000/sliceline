import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Button, ToggleButton, ButtonToolbar, ToggleButtonGroup } from 'react-bootstrap';
import sliceline_header from '../images/sliceline_header.jpg';
import '../css/login_signup.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
      this.setState({
        [event.target.id]: event.target.value,
      })
  }

  validateForm() {
    return this.state.email !== "" && this.state.password !== "";
  }

  render() {
    return (
      <div className='login'>
        <header className='login-header'>   
          <img src={sliceline_header} className='login-header-logo' alt='main'/>
        </header>
        <br></br>
        <form>
          <FormGroup controlId='email'>
            <ControlLabel>Email: </ControlLabel>
            <FormControl autoFocus bsSize='large' type='email' onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup controlId='password'>
            <ControlLabel>Password: </ControlLabel>
            <FormControl bsSize='large' type='password' onChange={this.handleChange}/>
          </FormGroup>

          <Button block disabled={!this.validateForm()} bsStyle='primary' bsSize='large'>Login</Button>
         </form>
      </div>
    )
  }
}

export default Login;
