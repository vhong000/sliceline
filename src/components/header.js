import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import Login from './login.js';
import sliceline_header from '../images/sliceline_header.jpg';
import '../css/header.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <img src={sliceline_header} className="header-main" alt='main'/>
        <div className='header-login'>
					<Link to="/login" style={{ textDecoration: 'none' }}>
						<Button block>Login</Button>
					</Link>
					<Button block >Sign Up</Button>
        </div>
      </header>
    );
  }
}

export default Header;
