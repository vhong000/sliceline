import { REST_FETCH_SUCCESS, REST_FETCH_FAIL, 
  REST_FETCH_LOADING, ALL_REST_FETCH_SUCCESS, 
  CHEF_FETCH_SUCCESS, CHEF_FETCH_FAIL, CHEF_FETCH_LOADING,
  SET_ACTIVE_CHEF, ADD_TO_CART, REMOVE_FROM_CART,
  DELIVERY_FETCH_ORDER, DELIVERY_FETCH_FAIL,
} from '../actions/types';
import { fetchCombos } from './menuActions.js';

const fetchChefs = (rest_id) => dispatch => {
  // chefs
  return fetch(`/api/restaurants/chef/${rest_id}/`, {
    method: "GET",
  }).then((response) => {
    dispatch({
      type: CHEF_FETCH_LOADING,
    })
    if (response.status !== 200) {
      return Promise.reject({
        message: "Cannot fetch chefs",
      })
    } else {
      return response.json();
    }
  }).then((chef_data) => {
    dispatch({
      type: CHEF_FETCH_SUCCESS,
      payload: chef_data,
    })
  }).catch((error) => {
    dispatch({
      type: CHEF_FETCH_FAIL,
      payload: error,
    })
  })
}

//    SET ACTIVE CHEF   //
export const setActiveChef = (cook) => dispatch => {
  dispatch({
    type: SET_ACTIVE_CHEF,
    payload: cook,
  });
  dispatch(fetchCombos(cook.emp_id))
}

//    ADD TO CART   //
export const addToCart = (item) => dispatch => {
  dispatch({
    type: ADD_TO_CART,
    payload: item,
  })
}

//    REMOVE FROM CART   //
export const removeFromCart = (item_name) => dispatch => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: item_name,
  })
}

//    FETCH RESTAURANT    //
export const fetchRestaurant = (rest_id) => dispatch => {
    return fetch(`/api/restaurants/${rest_id}/`, {
      method: "GET",
    }).then((response) => {
    dispatch({
      type: REST_FETCH_LOADING,
    })
    if (response.status !== 200) {
      return Promise.reject({
        message: "Cannot fetch restaurant",
      })
    } else {
      return response.json();
    }
  }).then((rest_data) => {
    dispatch({
      type: REST_FETCH_SUCCESS,
      payload: rest_data,
    });
    dispatch(fetchChefs(rest_id));
    // delivery and managers
  }).catch((error) => {
    dispatch({
      type: REST_FETCH_FAIL,
      payload: error,
    })
  })
}

//    FETCH ALL RESTAURANTS   //
export const fetchAllRestaurants = () => dispatch => {
  return fetch('api/restaurants/', {
    method: "GET",
  }).then((response) => {
    dispatch({
      type: REST_FETCH_LOADING,
    })
    if (response.status !== 200) {
      return Promise.reject({
        message: "Cannot fetch restaurants",
      })
    } else {
      return response.json();
    }
  }).then((json_data) => {
    dispatch({
      type: ALL_REST_FETCH_SUCCESS,
      payload: json_data,
    })
  }).catch((error) => {
    dispatch({
      type: REST_FETCH_FAIL,
      payload: error,
    })
  })
}

export const postOrder = (item) => dispatch => {
  return fetch('/api/order/place/', {
    method: "POST",   
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject({
        message: "cannot place order",
      })
    } else { return response.json(); }
  })
}

export const fetchDeliveryOrder = (emp_id) => dispatch => {
  return fetch(`/api/delivery/order/${emp_id}/`, {
    method: "GET",
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject({
        message: "cannot fetch delivery order"
      })
    } else { return response.json(); }
  }).then((order) => {
    dispatch({
      type: DELIVERY_FETCH_ORDER,
      payload: order,
    })
  }).catch((error) => {
    dispatch({
      type: DELIVERY_FETCH_FAIL,
      payload: error,
    })
  })
}
