import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Main from './components/main.js';
import Restaurant from './components/restaurant.js';
import BuildOrder from './components/buildOrder.js';
import Login from './components/login.js';
import Signup from './components/signup.js';
import store from './store.js';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<div>
				<Route exact path="/" component={Main}/>
				<Route exact path="/login" component={Login}/>
				<Route exact path="/signup" component={Signup}/>
				<Route exact path="/restaurant/:id" component={Restaurant}/>
				<Route exact path="/build/:rest_id/:access" component={BuildOrder}/>
			</div>
		</Router> 
	</Provider>,
  document.getElementById('root'));
registerServiceWorker();
