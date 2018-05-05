import { COMBO_FETCH_SUCCESS, COMBO_FETCH_FAIL, COMBO_FETCH_LOADING,
  ITEM_FETCH_SUCCESS, ITEM_FETCH_FAIL, ITEM_FETCH_LOADING,
} from '../actions/types.js';

export const fetchCombos = (chef_id) => dispatch => {
  return fetch(`/api/menu/${chef_id}/`, {
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
