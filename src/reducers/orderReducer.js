import { ORDER_ADD_SUCCESS, ORDER_ADD_FAIL, ORDER_ADD_LOAD,
  ITEM_ADD_SUCCESS, ITEM_ADD_FAIL, ITEM_ADD_LOAD,
} from '../actions/types.js';

const initialState = {
  cart: []
  loading: false,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case ORDER_ADD_SUCCESS:
      return {
      }
    case ORDER_ADD_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case ORDER_ADD_LOAD:
      return {
        ...state,
        loading: true,
      }
    case ITEM_ADD_SUCCESS:
      return {
      }
    case ITEM_ADD_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case ITEM_ADD_LOAD:
      return {
        ...state,
        loading: true,
      }
    default:
      return state;
  }
}
