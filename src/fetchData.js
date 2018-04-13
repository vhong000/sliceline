
export function allRestaurants() {
  return fetch("/api/restaurants/", {
    method: "GET",
  }).then((response) => {
      return response.json();
    })
}

export function signupEmployee(newEmployee) {
  return fetch("/api/employSignup/", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newEmployee),
	}).then((response) => {
		if (response.status === 401) {
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
