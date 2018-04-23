
export function allRestaurants() {
  return fetch("/api/restaurants/", {
    method: "GET",
  }).then((response) => {
      return response.json();
    })
}

export function signupEmployee(newEmployee, show) {
  return fetch("/api/employSignup/", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newEmployee),
	}).then((response) => {
    if (response.status === 200) {
      show()
    } else if (response.status === 401) {
      return Promise.reject({
        message: "Not authorized to sign up"
      });
    }
        else if (response.status === 500) {
        return Promise.reject({
        message: "server error"
      });
    }
	})
}

export function signupCustomer(newCustomer, show) {
  return fetch("/api/custSignup/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCustomer),
	}).then((response) => {
    if (response.status === 200) {
      show()
    } else if (response.status === 401) {
      return Promise.reject({
        message: "Not authorized to sign up"
      });
    } else if (response.status === 500) {
      return Promise.reject({
        message: "server error"
      });
    }
  })
}

export function login(user, show) {
  return fetch("/api/login/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
  }).then((response) => {
    if (response.status === 200) {
      show()
    } else if (response.status === 401) {
      return Promise.reject({
        message: "Not authorized to log in"
      });
    } else if (response.status === 404) {
      return Promise.reject({
        message: "Invalid username or password"
      });
    } else if (response.status === 500) {
      return Promise.reject({
        message: "server error"
      });
    }
  })
}

