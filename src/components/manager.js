import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header.js';

class ManagerEdit extends Component {

  componentDidMount() {
    // fetch warnings
  }

  render() {
    return(
      <div className='manager-edit'>
        <div className='manager-edit-chef'>
        </div>
        <div className='manager-edit-delivery'>
        </div>
        <div className='manager-edit-customer'>
        </div>
      </div>
    )
  }
}
