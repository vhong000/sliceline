import React, { Component } from 'react';
import Header from './components/header.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <div className='app-header'>
          <Header/>
        </div>
      </div>
    )
  }
}

export default App;
