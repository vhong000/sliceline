import React, { Component } from 'react';
import { Button, Well, Image, Modal, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Login from './login.js';
import Signup from './signup.js';
import sliceline_header from '../images/sliceline_header.jpg';
import '../css/header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      showSignup: false,
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleLogin(event) {
    const show = !this.state.showLogin;
    this.setState({
      showLogin: show,
    })
  }

  handleSignup(event) {
    const show = !this.state.showSignup;
    this.setState({
      showSignup: show,
    })
  }

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
            <ButtonGroup vertical>
              <Button block onClick={this.handleLogin}>
                Login
              </Button>
              <Button block onClick={this.handleSignup}>
                Sign Up
              </Button>
            </ButtonGroup>
            
            <Modal show={this.state.showLogin} onHide={this.handleLogin}>
              <Login show={this.handleLogin}/>
            </Modal>

            <Modal bsSize='large' show={this.state.showSignup} onHide={this.handleSignup}>
              <Signup show={this.handleSignup}/>
            </Modal>

          </div>
        )}
      </header>
    );
  }
}

export default Header;
