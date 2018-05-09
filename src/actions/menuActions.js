import { COMBO_FETCH_SUCCESS, COMBO_FETCH_FAIL, COMBO_FETCH_LOADING,
  ITEM_FETCH_SUCCESS, ITEM_FETCH_FAIL, ITEM_FETCH_LOADING,
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
