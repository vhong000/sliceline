import { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import restaurantReducer from './restaurantReducer.js';

export default combineReducers({
  Authenticate: authReducer,
  Restaurant: restaurantReducer
});
