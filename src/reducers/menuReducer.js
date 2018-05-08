import { COMBO_FETCH_SUCCESS, COMBO_FETCH_FAIL, COMBO_FETCH_LOADING,
  ITEM_FETCH_SUCCESS, ITEM_FETCH_FAIL, ITEM_FETCH_LOADING,
} from '../actions/types.js';

const initialState = {
  combos: [],
  crusts: [],
  toppings: [],
  drinks: [],
  appetizers: [],
  loading: false,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case COMBO_FETCH_SUCCESS:
      var allCombos = [];
      action.payload.map((item) => {
        allCombos.push(item.fields);
      });
      return {
        ...state,
        combos: allCombos
      }
    case COMBO_FETCH_FAIL:
      return {
        ...state,
        error: action.payload
      }
    case COMBO_FETCH_LOADING:
      return {
        ...state,
        loading: true,
      }
    case ITEM_FETCH_SUCCESS:
      const newDrinks = action.payload.fields.filter((crust) => {
        return crust.type === 'drink';
      })
      console.log(newDrinks);
      return {
        ...state,
        drinks: newDrinks,
      }
    case ITEM_FETCH_FAIL:
      return {
        ...state,
        error: action.payload,
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
