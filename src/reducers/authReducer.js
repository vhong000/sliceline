import { USER_AUTH_SUCCESS, USER_AUTH_FAIL, USER_AUTH_LOAD,
  USER_SIGNOUT, USER_REGISTER_SUCCESS, SET_USER_STATUS, ALL_REST_FETCH_SUCCESS,
  DELIVERY_FETCH_ORDER, DELIVERY_FETCH_FAIL, DELIVERY_REVIEWED,
  ORDER_POSTED,
} from '../actions/types.js';

const initialState = {
  user: '',
  //user: {
  //  rest_id: 3,
  //  status: 'manager',
  //  emp_id: 4,
  //},
  loading: false,
  status: 'Member',
  activeOrder: '', // used by delivery and customer for orders and reviews
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
    case DELIVERY_FETCH_ORDER:
      const menu_ids = stringToIntArray(action.payload[0].fields.menu_id).filter((item) => {
        return !!item;
      });
      console.log(menu_ids);
      const orderObj = action.payload[0].fields;
      return {
        ...state,
        activeOrder: orderObj,
      }
    case DELIVERY_FETCH_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case DELIVERY_REVIEWED:
      return {
        ...state,
        activeOrder: '',
      }
    case ORDER_POSTED:
      return {
        ...state,
        activeOrder: action.payload.order,
      }

    default:
      return state;
  }
}
