import { MENU_FETCH_SUCCESS, MENU_FETCH_FAIL, MENU_FETCH_LOADING,
  ITEM_FETCH_SUCCESS, ITEM_FETCH_FAIL, ITEM_FETCH_LOADING,
} from '../actions.types.js';

const initialState = {
  menu: [],
  item: {},
  loading: false,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case MENU_FETCH_SUCCESS:
      return {
      }
    case MENU_FETCH_FAIL:
      return {
      }
    case MENU_FETCH_LOADING:
      return {
        ...state,
        loading: true,
      }
    case ITEM_FETCH_SUCCESS:
      return {
      }
    case ITEM_FETCH_FAIL:
      return {
      }
    case ITEM_FETCH_LOADING:
      return {
        ...state,
        loading: true,
      }
    default: 
      return state;
  }
}
