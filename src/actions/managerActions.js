import { MANAGER_FETCH_CHEF, MANAGER_FETCH_DELIVERY, MANAGER_FIRE_EMPLOYEE,
  MANAGER_FETCH_FAIL, MANAGER_REMOVE_WARNING, MANAGER_FETCH_APPROVAL, MANAGER_SUBMIT_APPROVAL, ASSIGN_DELIVERY, MANAGER_FETCH_ORDERS,
} from '../actions/types.js';

const fetchChefEdits = (rest_id) => dispatch => {
  return fetch(`/api/manager/chef/${rest_id}/`, {
    method: "GET",
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject({
        message: "cannot fetch chefs",
      })
    } else {
      return response.json();
    }
  }).then((json_chefs) => {
    dispatch({
      type: MANAGER_FETCH_CHEF,
      payload: json_chefs,
    })
  }).catch((error) => {
    dispatch({
      type: MANAGER_FETCH_FAIL,
      payload: error,
    })
  })
}

const fetchDeliveryEdits = (rest_id) => dispatch => {
  return fetch(`/api/manager/delivery/${rest_id}/`, {
    method: "GET",
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject({
        message: "cannot fetch delivery",
      })
    } else {
      return response.json();
    }
  }).then((json_delivery) => {
    dispatch({
      type: MANAGER_FETCH_DELIVERY,
      payload: json_delivery,
    })
  }).catch((error) => {
    dispatch({
      type: MANAGER_FETCH_FAIL,
      payload: error,
    })
  })
}

const fetchApprovals = () => dispatch => {
  return fetch('/api/manager/list', {
    method: "GET",
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject({
        message: "cannot fetch approvals",
      })
    } else {
      return response.json();
    }
  }).then((json_approval) => {
    dispatch({
      type: MANAGER_FETCH_APPROVAL,
      payload: json_approval,
    })
  }).catch((error) => {
    dispatch({
      type: MANAGER_FETCH_FAIL,
      payload: error,
    })
  })
}

export const fetchEmployees = (rest_id) => dispatch => {
  dispatch(fetchChefEdits(rest_id));
  dispatch(fetchDeliveryEdits(rest_id));
  dispatch(fetchApprovals());
  dispatch(fetchOrders(rest_id));
}

export const removeWarning = (info, rest_id) => dispatch => {
  return fetch(`/api/manager/remove/`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject({
        message: "cannot remove warning",
      })
    } else { return rest_id; }
  }).then((rest_id) => {
    dispatch(fetchEmployees(rest_id));
  })
}

export const approveRegister = (userInfo) => dispatch => {
  return fetch('/api/manager/approval/', {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo)
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject({
        message: "cannot remove warning",
      })
    } else {
      return response.json();
    }
  }).then(() => {
    dispatch(fetchApprovals());
  })
}

export const fetchOrders = (rest_id) => dispatch => {
  return fetch(`api/manager/order${rest_id}/`, {
    method: "GET",
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject({
        message: "cannot fetch orders",
      })
    } else {
      return response.json();
    }
  }).then((json_orders) => {
    dispatch({
      type: MANAGER_FETCH_ORDERS,
      payload: json_orders,
    })
  }).catch((error) => {
    dispatch({
      type: MANAGER_FETCH_FAIL,
      payload: error,
    })
  })
}

export const assignDelivery = (info, rest_id) => dispatch => {
  return fetch('/api/manager/assign/', {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info)
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject({
        message: "cannot assign delivery",
      })
    } else { return response.json(); }
  }).then((rest_id) => {
    dispatch(fetchDeliveryEdits(rest_id));
  })
}
