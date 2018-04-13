import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Button, ToggleButton, ButtonToolbar, ToggleButtonGroup } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import sliceline_header from '../images/sliceline_header.jpg';
import '../css/login_signup.css';
import {checkEmail,employees,login,costumer} from "../fetchData";

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
        // var object_email = checkEmail();
        // var email ="";
        // var i;
        // for(i= 0; i < object_email.length; i++){
        //     if (object_email.email == this.state.email){
        //         email = object_email.email;
        //     }
        // }
        // var password=""
        // var check=""
        // var AES = require("crypto-js/aes");
        // var SHA256 = require("crypto-js/sha256");
        // var j;
        // if (email.type == 'customer') {
        //     var object_costumer = costumer();
        //     for (j = 0; j < object_costumer.length; j++) {
        //         if (object_costumer.email == email) {
        //             password = object_costumer.password = password;
        //             check = SHA256(this.state.password);
        //             if (password == check) {
        //                 return true
        //             }
        //         }
        //     }
        // }
        // else{
        //     var object_employees = employees();
        //     if(object_employees.email == email){
        //         password = object_employees.password = password;
        //         check = SHA256(this.state.password);
        //         if(password == check){
        //             return true
        //         }
        //     }
        // }
        return this.state.email !== "" && this.state.password !== "";
  }

  render() {
    return (
      <div className='login'>

        <header className='login-header'>
          <Link to="/">
            <img src={sliceline_header} className='login-header-logo' alt='main'/>
          </Link>
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
