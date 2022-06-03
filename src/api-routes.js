import { userApi } from "./api/user-api.js";
import { placemarkApi } from "./api/placemark-api.js";
import { visitApi } from "./api/visit-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users/{id}", config: userApi.update },

  { method: "GET", path: "/api/placemarks", config: placemarkApi.find },
  { method: "POST", path: "/api/placemarks", config: placemarkApi.create },
  { method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll },
  { method: "DELETE", path: "/api/placemarks/{id}", config: placemarkApi.deleteOne },
  { method: "GET", path: "/api/placemarks/{id}", config: placemarkApi.findOne },
  { method: "GET", path: "/api/placemarks/user/{id}", config: placemarkApi.userPlacemarks },
  { method: "GET", path: "/api/placemarks/activities", config: placemarkApi.activities },
  { method: "GET", path: "/api/placemarks/categories", config: placemarkApi.categories },

  { method: "POST", path: "/api/visit", config: visitApi.create },
  { method: "POST", path: "/api/visit/image", config: visitApi.storeImage },
  { method: "DELETE", path: "/api/visit/image/{id}", config: visitApi.deleteImage },
  { method: "GET", path: "/api/visit", config: visitApi.find },
  { method: "GET", path: "/api/visit/{id}", config: visitApi.getPlacemarkVisits },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
];
