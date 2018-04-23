import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Main from './components/main.js';
import Restaurant from './components/restaurant.js';
import Menu from './components/menu.js';
import Login from './components/login.js';
import Signup from './components/signup.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Restaurant}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/signup" component={Signup}/>
      {/*<Route exact path="/restaurant/:rest_id/:access" component={Restaurant}/>*/}
      <Route exact path="/menu/:rest_id/:access" component={Menu}/>
    </div>
  </Router>, 
  document.getElementById('root'));
registerServiceWorker();
