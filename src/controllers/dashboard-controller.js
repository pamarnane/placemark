import { handler } from "@hapi/hapi/lib/cors.js";
import { db } from "../models/db.js";
import { PlacemarkSpec } from "../models/db/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const placemarks = await db.placemarkStore.getUserPlacemarks(loggedInUser._id);
      const categories = await db.placemarkStore.getAllCategories();
      const viewData = {
        title: "PlaceMark Dashboard",
        placemarks: placemarks,
        categories: categories,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPlacemark: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const loggedInUser = request.auth.credentials;
        const placemarks = await db.placemarkStore.getUserPlacemarks(loggedInUser._id);
        const viewData = {
          title: "PlaceMark Dashboard",
          placemarks: placemarks,
          errors: error.details,
        };
        // return h.view("dashboard-view", { title: "Add Placemark error", errors: error.details }).takeover().code(400);
        return h.view("dashboard-view", viewData).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPlacemark = {
        userid: loggedInUser._id,
        name: request.payload.name,
        category: request.payload.category,
        description: request.payload.description,
      //  favourite: request.payload.favourite,
      };
      await db.placemarkStore.addPlacemark(newPlacemark);
      return h.redirect("/dashboard");
    },
  },

  deletePlacemark: {
  handler: async function (request, h) {
    const loggedInUser = request.auth.credentials;
     const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
    // logger.info(`Deleting Placemark ${placemarkId}`);
    await db.placemarkStore.deletePlacemark(placemark._id);
    return h.redirect("/dashboard");
    },
  },
  
};