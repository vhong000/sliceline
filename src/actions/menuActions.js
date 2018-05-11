import { COMBO_FETCH_SUCCESS, COMBO_FETCH_FAIL, COMBO_FETCH_LOADING,
  ITEM_FETCH_SUCCESS, ITEM_FETCH_FAIL, ITEM_FETCH_LOADING,
  COMBO_ON_CHANGE, NEW_COMBO_FORM, COMBO_REMOVE,
} from '../actions/types.js';

export const fetchCombos = (chef_id) => dispatch => {
  return fetch(`/api/menu/chef/${chef_id}/`, {
    method: "GET",
  }).then((response) => {
    dispatch({
      type: COMBO_FETCH_LOADING,
    })
    if (response.status !== 200) {
      return Promise.reject({
        message: "cannot fetch combos",
      })
    } else { 
      return response.json(); 
    }
  }).then((json_combo) => {
    dispatch({
      type: COMBO_FETCH_SUCCESS,
      payload: json_combo,
    })
  }).catch((error) => {
    dispatch({
      type: COMBO_FETCH_FAIL,
      payload: error,
    })
  })
}

export const fetchMenuItems = () => dispatch => {
  return fetch('/api/ingredient/', {
    method: "GET",
  }).then((response) => {
    dispatch({
      type: ITEM_FETCH_LOADING,
    })
    if (response.status !== 200) {
      return Promise.reject({
        message: "cannot fetch menu items",
      })
    } else {
      return response.json();
    }
  }).then((json_menu_item) => {
    dispatch({
      type: ITEM_FETCH_SUCCESS,
      payload: json_menu_item,
    })
  }).catch((error) => {
    dispatch({
      type: ITEM_FETCH_FAIL,
      payload: error,
    })
  })
}

export const comboEdit = (number, category, value) => dispatch => {
  dispatch({
    type: COMBO_ON_CHANGE,
    payload: value,
    name: category,
    index: number
  })
}

export const newComboForm = (chef) => dispatch => {
  const newForm = { // no pk
    chef_id: chef,
    name: null,
    crust: null,
    toppings: null,
    drinks: null,
    appetizers: null,
    description: null,
    picture: null,
    price: null,
  }
  dispatch({
    type: NEW_COMBO_FORM,
    payload: newForm,
  })
}

export const comboUpdate = (newCombo, chef_id) => dispatch => {
  return fetch('/api/menu/update/', {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCombo),
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject({
        message: "cannot update combo",
      })
    } else { return chef_id; }
  }).then((chef_id) => { dispatch(fetchCombos(chef_id)); })
}

export const comboDelete = (comboPK, chef_id) => dispatch => {
  return fetch('/api/menu/delete/', {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comboPK),
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject({
        message: "cannot delete combo",
      })
    } else { return chef_id; }
  }).then((chef_id) => { dispatch(fetchCombos(chef_id)); })
}

export const comboCreate = (newCombo, chef_id) => dispatch => {
  return fetch('/api/chef/create/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCombo),
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject({
        message: "cannot create combo",
      })
    } else { return chef_id; }
  }).then((chef_id) => { dispatch(fetchCombos(chef_id)); })
}

export const comboRemove = (chef_id) => dispatch => {
  dispatch({
    type: COMBO_REMOVE,
  });
  dispatch(fetchCombos(chef_id));
}
