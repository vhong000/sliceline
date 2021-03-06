import { REST_FETCH_SUCCESS, REST_FETCH_FAIL, 
  REST_FETCH_LOADING, ALL_REST_FETCH_SUCCESS, 
  CHEF_FETCH_SUCCESS, CHEF_FETCH_FAIL, CHEF_FETCH_LOADING,
  SET_ACTIVE_CHEF, ADD_TO_CART, REMOVE_FROM_CART,
} from '../actions/types'
import { combineReducers } from './index.js';

const initialState = {
  loading: false,
  restaurants: [],
  cart: [],
  chefs: [],
  activeChef: '',
  delivery: [],
  manager: '',
  restaurant: '',
}

export default function(state = initialState, action) {
  switch(action.type) {
    case REST_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurant: action.payload,
      }
    case REST_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case REST_FETCH_LOADING:
      return {
        ...state,
        loading: true,
      }
    case ALL_REST_FETCH_SUCCESS:
      return {
        ...initialState,
        loading: false,
        restaurants: action.payload,
      }
    case CHEF_FETCH_SUCCESS:
      const allChefs = action.payload.map((chef) => {
        return chef.fields;
      })
      return {
        ...state,
        chefs: allChefs,
        loading: false,
      }
    case CHEF_FETCH_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case CHEF_FETCH_LOADING:
      return {
        ...state,
        loading: true,
      }
    case SET_ACTIVE_CHEF:
      return {
        ...state,
        activeChef: action.payload,
      }
    case ADD_TO_CART:
      const newCart = state.cart.concat(action.payload);
      return {
        ...state,
        cart: newCart,
      }
    case REMOVE_FROM_CART:
      const itemIndex = state.cart.findIndex((item) => {
        return item.name === action.payload;
      })
      if (itemIndex !== -1) {
        const newCart = state.cart.filter((item, index) => {
          return index !== itemIndex;
        })
        return {
          ...state,
          cart: newCart,
        }
      } else {
        return { ...state, }
      }
    default:
      return state;
  }
}
