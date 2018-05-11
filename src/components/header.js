import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Well, Image, Modal, ButtonGroup,
  Navbar, 
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Login from './login.js';
import Signup from './signup.js';
import { signout } from '../actions/authActions.js';
import sliceline_header from '../images/sliceline_header.jpg';
import '../css/header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
  }

  handleLogin(event) {
    const show = !this.state.showLogin;
    this.setState({
      showLogin: show,
    })
  }

  handleSignout(event) {
    this.props.signout();
    this.props.history.push('/')
  }

  render() {
    return (
      <header className="header">
        <div className="header-main"> 
          <Link to='/'>
            <Image responsive src={sliceline_header} />
          </Link>
        </div>

        {this.props.userData ? (
          <Navbar fluid='true'>
            <Navbar.Header>
              Welcome {this.props.userData.name}
          </Navbar.Header>
            <Button block onClick={this.handleSignout}>
              Sign out
            </Button>
          </Navbar>
          ) : (
          <div className='header-login'>
            <ButtonGroup vertical>
              <Button block onClick={this.handleLogin}>
                Login
              </Button>
              <Button block href='/signup'>
                Sign Up
              </Button>
            </ButtonGroup>
            
            <Modal show={this.state.showLogin} onHide={this.handleLogin}>
              <Login show={this.handleLogin}/>
            </Modal>

          </div>
        )}
      </header>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.Authenticate.user,
  cart: state.Restaurant.cart,
})

export default withRouter(connect(mapStateToProps, { signout })(Header));
