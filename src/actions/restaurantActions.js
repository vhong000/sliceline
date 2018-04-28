import { REST_FETCH_SUCCESS, REST_FETCH_FAIL, 
  REST_FETCH_LOADING, ALL_REST_FETCH_SUCCESS, 
} from '../actions/types'


//    FETCH RESTAURANT(S)    //
export const fetchRestaurant = (rest_id) => dispatch => {
  var queryid = rest_id; 
  if (queryid === undefined) { queryid = ''; }
  else { queryid = queryid + '/' }
  console.log(queryid)
    return fetch(`/api/restaurants/${queryid}`, {
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
  }).then((json_data) => {
    queryid ? (
    dispatch({
      type: REST_FETCH_SUCCESS,
      payload: json_data,
    })
    ) : (
      dispatch({
        type: ALL_REST_FETCH_SUCCESS,
        payload: json_data,
      })
    )
  }).catch((error) => {
    dispatch({
      type: REST_FETCH_FAIL,
      payload: error,
    })
  })

}
