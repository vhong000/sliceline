import { REST_FETCH_SUCCESS, REST_FETCH_FAIL, REST_FETCH_LOADING } from '../actions/types'

const initialState = {
  loading: false,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case REST_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case REST_FETCH_FAIL:
      return {
        ...state,
        loading: false,
      }
    case REST_FETCH_LOADING:
      return {
        ...state,
        loading: true,
      }
    default:
      return state;
  }
}
