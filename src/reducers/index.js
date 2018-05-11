import { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import restaurantReducer from './restaurantReducer.js';
import menuReducer from './menuReducer.js';

export default combineReducers({
  Authenticate: authReducer,
  Restaurant: restaurantReducer,
  Menu: menuReducer,
});
