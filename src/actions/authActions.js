import { USER_AUTH_SUCCESS, USER_AUTH_FAIL, USER_AUTH_LOAD,
  USER_SIGNOUT, USER_REGISTER_SUCCESS,
} from './types.js'; 

//    EMPLOYEE REGISTER   //
export const registerEmployee = (newEmployee) => dispatch => {
   return fetch("/api/employSignup/", {
 		method: "POST",
 		headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json'
 		},
 		body: JSON.stringify(newEmployee),
 	}).then((response) => {
    dispatch({
      type: USER_AUTH_LOAD,
    }) 
    if (response.status === 409) {
      return Promise.reject({
        message: "This email is not available",
      });
    } 
    else if (response.status === 500) {
      return Promise.reject({
        message: "server error"
      });
    }
  }).then(result =>
    dispatch({
      type: USER_REGISTER_SUCCESS,
    })
  ).then(error =>
    dispatch({
      type: USER_AUTH_FAIL,
      payload: error,
    })
  )
}

//    CUSTOMER REGISTER   // 
export const registerCustomer = (newCustomer) => dispatch => {
  return fetch("/api/custSignup/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newCustomer),
	}).then((response) => {
    dispatch({
      type: USER_AUTH_LOAD,
    })
    if (response.status === 409) {
      return Promise.reject({
        message: "This email is not available"
      });
    } else if (response.status === 404) {
      return Promise.reject({
        message: "Not authorized to register"
      });
    } else if (response.status === 500) {
      return Promise.reject({
        message: "server error"
      });
    } else {
      return response;
    }
  }).then(res => 
    dispatch({
      type: USER_REGISTER_SUCCESS,
    })
  ).catch((error) => {
    console.log(error),
    dispatch({
      type: USER_AUTH_FAIL,
      payload: error,
    })
  })
}

//    LOGIN   //
export const login = (user) => dispatch => {
  return fetch("/api/login/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(user),
  }).
    then((response) => {
      dispatch({
        type: USER_AUTH_LOAD,
      })
      if (response.status === 404) {
        return Promise.reject({
          message: "Invalid username or password"
        });
      } else if (response.status === 500) {
        return Promise.reject({
          message: "server error"
        });
      } else { return response.json(); }
    }).then((json_data) => {
    dispatch({
      type: USER_AUTH_SUCCESS,
      payload: json_data,
    })
  }).catch((error) => {
    dispatch({
      type: USER_AUTH_FAIL,
      payload: error,
    })
  })
}

//    SIGN_OUT    //
export const signout = ()=> dispatch => {
  dispatch({
    type: USER_SIGNOUT,
  })
}
