import { REST_FETCH_SUCCESS, REST_FETCH_FAIL, 
  REST_FETCH_LOADING, ALL_REST_FETCH_SUCCESS, 
  CHEF_FETCH_SUCCESS, CHEF_FETCH_FAIL, CHEF_FETCH_LOADING,
  SET_ACTIVE_CHEF, ADD_TO_CART, REMOVE_FROM_CART,
} from '../actions/types'

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
      const allChefs = [];
      action.payload.map((chef) => {
        allChefs.push(chef.fields);
      })
      return {
        ...state,
        chefs: allChefs,
      }
    case CHEF_FETCH_FAIL:
      return {
        ...state,
        error: action.payload,
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
      var newCart = state.cart;
      newCart.push(action.payload);
      console.log(newCart);
      return {
        ...state,
        cart: newCart,
      }
    case REMOVE_FROM_CART:
      var newCart = state.cart.filter((item) => {
        return item.name !== action.payload;
      })
      return {
        ...state,
        cart: newCart,
      }
    default:
      return state;
  }
}
