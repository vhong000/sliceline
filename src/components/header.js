import React, { Component } from 'react';
import sliceline_header from '../images/sliceline_header.jpg';
import '../css/header.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <header className="header-images">
          <img src={sliceline_header} className="header-main" alt='main'/>
        </header>
      </div>
    );
  }
}

export default Header;
