import { USER_AUTH_SUCCESS, USER_AUTH_FAIL, USER_AUTH_LOAD,
  USER_SIGNOUT, USER_REGISTER_SUCCESS, SET_USER_STATUS, ALL_REST_FETCH_SUCCESS,
} from '../actions/types.js';

const initialState = {
  //user: '',
  user: {
    rest_id: 3,
    status: 'manager',
  },
  loading: false,
  status: 'Member',
}

function stringToIntArray(array) {
  const final = array.split(',').map((item) => {
    return parseInt(item);
  })
  return final;
}

export default function(state = initialState, action) {
  switch(action.type) {
    case USER_AUTH_SUCCESS:
      // parse user info
      var userInfo = {}
      if (action.payload.status) { // employee
        userInfo = action.payload;
      } else { // customer needs parsing
        const vips = stringToIntArray(action.payload.VIP);
        const rests = stringToIntArray(action.payload.rest);

        userInfo = {
          ...action.payload,
          VIP: vips,
          rest: rests,
        }
      }
      return {
        ...state,
        user: userInfo,
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
    case USER_REGISTER_SUCCESS:
      return {
        ...initialState,
      }
    case SET_USER_STATUS:
      return {
        ...state,
        status: action.payload,
      }
    case ALL_REST_FETCH_SUCCESS:
      return {
        ...state,
        status: 'Member',
      }
    default:
      return state;
  }
}
