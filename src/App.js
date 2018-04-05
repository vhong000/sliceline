import React, { Component } from 'react';
import Header from './components/header.js';
import Sidebar from './components/sidebar.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <div className='app-header'>
          <Header/>
        </div>
        <div className='app-sidebar'>
          <Sidebar/>
        </div>
      </div>
    )
  }
}

export default App;
