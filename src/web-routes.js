import { accountsController } from "./controllers/accounts-controllers.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { adminController } from "./controllers/admin-controller.js";
import { visitController} from "./controllers/visit-controller.js";


export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/account", config: accountsController.showAccount },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "POST", path: "/account/update/{id}", config: accountsController.update },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "GET", path: "/dashboard/deleteplacemark/{id}", config: dashboardController.deletePlacemark },
  { method: "POST", path: "/dashboard/addplacemark", config: dashboardController.addPlacemark },

  { method: "GET", path: "/admin", config: adminController.index },
  { method: "POST", path: "/admin/addcategory", config: adminController.addCategory },
  { method: "GET", path: "/admin/deletecategory/{id}", config: adminController.deleteCategory },
  { method: "POST", path: "/admin/addactivity", config: adminController.addActivity },
  { method: "GET", path: "/admin/deleteactivity/{id}", config: adminController.deleteActivity },
  { method: "GET", path: "/admin/deleteuser/{id}", config: adminController.deleteUser },

  { method: "GET", path: "/placemark/{id}", config: visitController.index },
  { method: "POST", path: "/placemark/{id}/logvisit", config: visitController.addVisit },
  { method: "GET", path: "/placemark/{placemarkid}/deletevisit/{id}", config: visitController.deleteVisit },

  { method: "POST", path: "/placemark/{id}/uploadimage", config: visitController.uploadImage },

];