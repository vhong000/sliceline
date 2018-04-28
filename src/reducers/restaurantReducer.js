import { REST_FETCH_SUCCESS, REST_FETCH_FAIL, 
  REST_FETCH_LOADING, ALL_REST_FETCH_SUCCESS, 
} from '../actions/types'

const initialState = {
  loading: false,
  restaurants: [],
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
    default:
      return state;
  }
}
