import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Well, Image, Modal, ButtonGroup,
  Navbar, Popover, OverlayTrigger,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Login from './login.js';
import Signup from './signup.js';
import { signout, determineStatus } from '../actions/authActions.js';
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

  componentWillReceiveProps(nextProps) {
    this.props.determineStatus(nextProps.userData, this.props.rest_id) 
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
    const infoPopover = (
        <Popover id='info-pop'>
          {this.props.userData.status ? (
            <div>
            <strong>Employee ID: </strong>{this.props.userData.emp_id}
            </div>
          ) : (
            <div>
            <strong>Wallet: </strong>{this.props.userData.wallet}
            </div>
          )}
        </Popover>
    )
    return (
      <div className="header">
        <div className="header-main"> 
          <Link to='/'>
            <Image responsive src={sliceline_header} />
          </Link>
        </div>

        {this.props.userData ? (
            <div className='header-info'>
          <OverlayTrigger trigger='hover' placement='bottom' overlay={infoPopover}>
              <p>Welcome {this.props.status} {this.props.userData.name}</p>
          </OverlayTrigger>
              <Button block 
                bsSize='small'
                bsStyle='warning'
                onClick={this.handleSignout}>
                Sign out
              </Button>
          </div>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rest_id: state.Restaurant.restaurant.rest_id,
  userData: state.Authenticate.user,
  status: state.Authenticate.status,
})

export default withRouter(connect(mapStateToProps, { signout, determineStatus })(Header));
