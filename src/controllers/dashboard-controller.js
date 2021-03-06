import { handler } from "@hapi/hapi/lib/cors.js";
import _ from "lodash";
import { db } from "../models/db.js";
import { PlacemarkSpec } from "../models/db/joi-schemas.js";



export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const placemarks = await db.placemarkStore.getUserPlacemarks(loggedInUser._id);
      let categories = await db.placemarkStore.getAllCategories();
      let activities = await db.placemarkStore.getAllActivities();
      categories = _.sortBy(categories, "category")
      activities = _.sortBy(activities, "activity")
      const viewData = {
        title: "PlaceMark Dashboard",
        placemarks: placemarks,
        categories: categories,
        activities: activities,
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
        const categories = await db.placemarkStore.getAllCategories();
        const viewData = {
          title: "PlaceMark Dashboard",
          placemarks: placemarks,
          errors: error.details,
          categories: categories,
        };
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
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
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