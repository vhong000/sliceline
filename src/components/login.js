import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Button, ToggleButton, ButtonToolbar, ToggleButtonGroup } from 'react-bootstrap';
import { Panel, Row, Col, Image, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { login } from "../fetchData";
import sliceline_header from '../images/sliceline_header.jpg';
import '../css/login_signup.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: "",
      },
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.id]: event.target.value,
      }
    })
  }

  handleSubmit(event) {
    const final = this.state.user;
    console.log(JSON.stringify(final));
    login(final, this.props.show).catch((error) => {
      this.setState({
        error: error,
      });
    }).then((jsonData) => {
      console.log(jsonData);
    })
  }

  validateForm() {
    return this.state.user.email !== "" && this.state.user.password !== "";
  }

  render() {
    return (
      <div className='login'>

        <header className='login-header'>
          <Image src={sliceline_header} className='login-header-logo' alt='main'/>
        </header>
        <br></br>

        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId='email'>
            <ControlLabel>Email: </ControlLabel>
            <FormControl autoFocus bsSize='large' type='email' onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup controlId='password'>
            <ControlLabel>Password: </ControlLabel>
            <FormControl bsSize='large' type='password' onChange={this.handleChange}/>
          </FormGroup>

          {this.state.error ? (
            <Alert bsStyle='danger'>{this.state.error.message}</Alert>
          ) : ( null )
          }

          <Button block type='submit' disabled={!this.validateForm()} 
            bsStyle='primary' bsSize='large' onClick={this.handleSubmit}>
            Login
          </Button>
         </form>
      </div>
    )
  }
}

export default Login;
