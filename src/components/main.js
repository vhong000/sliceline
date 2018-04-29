import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { Row, Col, 
} from 'react-bootstrap';
import Header from './header.js';
import Sidebar from './sidebar.js';
import GoogleApiWrapper from './map.js';
import '../css/App.css';

class Main extends Component {
  render() {
    return (
      <div className='app'>
        <div className='app-header'>
          <Header/>
        </div>
        <Row>
          <Col xs={3}>
            <div className='app-sidebar'>
              <Sidebar/>
            </div>
          </Col>
        </Row>
          <div className='app-map'>
              <GoogleApiWrapper/>
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userData: state.Authenticate.user,
})

export default connect(mapStateToProps, null)(Main);
