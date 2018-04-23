import React, { Component } from 'react';
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
        <div className='app-sidebar'>
          <Sidebar/>
        </div>
        <div className='app-map'>
          <GoogleApiWrapper/>
        </div>
      </div>
    )
  }
}

export default Main;
