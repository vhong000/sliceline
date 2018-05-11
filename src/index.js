import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Main from './components/main.js';
import Checkout from './components/checkout.js';
import Restaurant from './components/restaurant.js';
import Login from './components/login.js';
import Signup from './components/signup.js';
import ReviewForm from './components/reviewForm.js';
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
        <Route exact path="/checkout" component={Checkout}/>
        <Route exact path="/review" component={ReviewForm}/>
			</div>
		</Router> 
	</Provider>,
  document.getElementById('root'));
registerServiceWorker();
