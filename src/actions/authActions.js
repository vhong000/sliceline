import { USER_AUTH_SUCCESS, USER_AUTH_ERROR, USER_AUTH_LOAD } from './types.js'; 
//
// export function signupEmployee(newEmployee, show) {
//   return fetch("/api/employSignup/", {
// 		method: "POST",
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify(newEmployee),
// 	}).then((response) => {
//     if (response.status === 200) {
//       show()
//     } else if (response.status === 401) {
//       return Promise.reject({
//         message: "Not authorized to sign up"
//       });
//     }
//         else if (response.status === 500) {
//         return Promise.reject({
//         message: "server error"
//       });
//     }
//   }).then(result =>
//     dispatch({
//       type: REGISTER_SUCCESS
//     })
//   )
// }


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
    console.log(json_data)
    dispatch({
      type: USER_AUTH_SUCCESS,
      payload: json_data,
    })
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: USER_AUTH_ERROR,
      payload: error,
    })
  })
}
