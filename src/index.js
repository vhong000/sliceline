import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Menu from './components/menu.js';
import Login from './components/login.js';
import Signup from './components/signup.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/signup" component={Signup}/>
      {/*<Route exact path="/editmenu/:id" component={EditMenu}/>*/}
    </div>
  </Router>, 
  document.getElementById('root'));
registerServiceWorker();
