import React, { Component } from 'react';
import { Button, Well, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import sliceline_header from '../images/sliceline_header.jpg';
import '../css/header.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header-main"> 
          <Link to="/">
            <Image responsive src={sliceline_header}/>
          </Link>
        </div>
        {this.props.user ? (
          <Well bsSize='small'>
            logged in as {this.props.user}
            <Button block>
              Sign out
            </Button>
          </Well>
          ) : (
          <div className='header-login'>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button block>Login</Button>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button block>Sign Up</Button>
          </Link>
        </div>
        )}
      </header>
    );
  }
}

export default Header;
