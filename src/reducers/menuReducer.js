import { COMBO_FETCH_SUCCESS, COMBO_FETCH_FAIL, COMBO_FETCH_LOADING,
  ITEM_FETCH_SUCCESS, ITEM_FETCH_FAIL, ITEM_FETCH_LOADING,
  COMBO_ON_CHANGE, NEW_COMBO_FORM, COMBO_REMOVE,
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
      const allCombos = action.payload.map((item) => {
        item.fields.pk = item.pk;
        return item.fields;
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
      const newDrinks = action.payload.filter((drink) => {
        return drink.type === 'drinks';
      })
      const newCrusts = action.payload.filter((crust) => {
        return crust.type === 'crust';
      })
      const newToppings = action.payload.filter((topping) => {
        return topping.type === 'topping';
      })
      const newAppetizers = action.payload.filter((appetizer) => {
        return appetizer.type === 'appetizers';
      })
      return {
        ...state,
        drinks: newDrinks,
        crusts: newCrusts,
        toppings: newToppings,
        appetizers: newAppetizers,
        loading: false,
      }
    case ITEM_FETCH_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case ITEM_FETCH_LOADING:
      return {
        ...state,
        loading: true,
      }
    case COMBO_ON_CHANGE:
      const newCombos = state.combos.map((combo, index) => {
        if (index === action.index) {
          const newCombo = {
            ...combo,
            [action.name]: action.payload,
          }
          return newCombo;
        } else { return combo; }
      })
      return {
        ...state,
        combos: newCombos,
      }
    case NEW_COMBO_FORM:
      const newForm = state.combos.concat(action.payload);
      return {
        ...state,
        combos: newForm,
      }
    case COMBO_REMOVE:
      const removedCombo = [...state.combos];
      removedCombo.pop();
      return {
        ...state,
        combos: removedCombo,
      }
    default: 
      return state;
  }
}
