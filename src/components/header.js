import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button block>Sign Up</Button>
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
