import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Button, ToggleButton, ButtonToolbar, ToggleButtonGroup } from 'react-bootstrap';
import { Panel, Row, Col, Image } from 'react-bootstrap';
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
      }
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
    login(final);
  }

  validateForm() {
    return this.state.user.email !== "" && this.state.user.password !== "";
  }

  render() {
    return (
      <div className='login'>

        <header className='login-header'>
          <Link to="/">
            <Image src={sliceline_header} className='login-header-logo' alt='main'/>
          </Link>
        </header>
        <br></br>

        <form onsubmit={this.handleSubmit}>
          <FormGroup controlId='email'>
            <ControlLabel>Email: </ControlLabel>
            <FormControl autoFocus bsSize='large' type='email' onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup controlId='password'>
            <ControlLabel>Password: </ControlLabel>
            <FormControl bsSize='large' type='password' onChange={this.handleChange}/>
          </FormGroup>

          <Row>
            <Col xs={8}>
              <Button block disabled={!this.validateForm()} 
                bsStyle='primary' bsSize='large' onClick={this.handleSubmit}>
                Login
              </Button>
            </Col>
            <Col xs={4}>
              <Link to='/signup'>
                <Button block bsStyle='success' bsSize='large'>
                  Register
                </Button>
              </Link>
            </Col>
          </Row>
         </form>
      </div>
    )
  }
}

export default Login;
