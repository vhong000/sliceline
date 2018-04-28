import { USER_AUTH_SUCCESS, USER_AUTH_FAIL, USER_AUTH_LOAD,
  USER_SIGNOUT,
} from '../actions/types.js';

const initialState = {
  //user: {
  //  name: 'test',
  //},
  loading: false,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case USER_AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,       
        error: '',
        loading: false,
      }
    case USER_AUTH_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case USER_AUTH_LOAD:
      return {
        ...state,
        loading: true,
      }
    case USER_SIGNOUT:
      return {
        ...initialState,
      }
    default:
      return state;
  }
}
