import { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import restaurantReducer from './restaurantReducer.js';
import menuReducer from './menuReducer.js';
import managerReducer from './managerReducer.js';

export default combineReducers({
  Authenticate: authReducer,
  Restaurant: restaurantReducer,
  Menu: menuReducer,
  Manager: managerReducer,
});

