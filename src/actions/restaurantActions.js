import { REST_FETCH_SUCCESS, REST_FETCH_FAIL, 
  REST_FETCH_LOADING, ALL_REST_FETCH_SUCCESS, 
  CHEF_FETCH_SUCCESS, CHEF_FETCH_FAIL, CHEF_FETCH_LOADING,
} from '../actions/types'


//    FETCH RESTAURANT(S)    //
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
    })
  }).catch((error) => {
    dispatch({
      type: REST_FETCH_FAIL,
      payload: error,
    })
  }).then(()=> {
    return fetch(`/api/restaurants/store/${rest_id}/`, {
      method: "GET",
    }).then((response) => {
      dispatch({
        type: CHEF_FETCH_LOADING,
      })
      if (response.status !== 200) {
        return Promise.reject({
          message: "Cannot fetch chef",
        })
      } else {
        return response.json();
      }
    })
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
