
export function allRestaurants() {
  return fetch("http://127.0.0.1:8000/api/restaurants/", {
    method: "GET",
  }).then((response) => {
      return response.json();
    })
}

