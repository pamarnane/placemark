import Boom from "@hapi/boom";
import Axios from "axios";
import { db } from "../models/db.js";
import { validationError } from "../logger.js";
import { PlacemarkArray, IdSpec, PlacemarkSpec } from "../models/db/joi-schemas.js"; 


export const placemarkApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        return placemarks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all placemarkApi",
    notes: "Returns details of all placemarkApi",
    response: { schema: PlacemarkArray, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No Placemark with this id");
        }
        return placemark;
      } catch (err) {
        return Boom.serverUnavailable("No Placemark with this id");
      }
    },
    tags: ["api"],
    description: "Get all placemarkApi",
    notes: "Returns details of all placemarkApi",
    response: { schema: PlacemarkSpec, failAction: validationError },
    validate: { params: {id: IdSpec}, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.addPlacemark(request.payload);
        if (placemark) {
          return placemark
        }
        return Boom.badImplementation("error creating placemark");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a placemark",
    notes: "Returns the created placemark",
    response: { schema: PlacemarkSpec, failAction: validationError },
    validate: { payload: PlacemarkSpec, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.placemarkStore.deleteAllPlacemarks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all placemarks",
    notes: "Deletes all stored placemarks",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.placemarkStore.deletePlacemark(request.params.id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete single placemark",
    notes: "Deletes a single placemark",
  },

  activities: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const activities = await db.placemarkStore.getAllActivities();
        return activities;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all activities",
    notes: "Returns details of all activities",
  /*   response: { schema: PlacemarkArray, failAction: validationError }, */
  },

  categories: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const categories = await db.placemarkStore.getAllCategories();
        return categories;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all categories",
    notes: "Returns details of all categories",
  /*   response: { schema: PlacemarkArray, failAction: validationError }, */
  },

  userPlacemarks: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarks = await db.placemarkStore.getUserPlacemarks(request.params.id);
        return placemarks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all user placemarks",
    notes: "Returns details of all placemarks",
  /*   response: { schema: PlacemarkArray, failAction: validationError }, */
  },

  getCurrentWeather: {
    auth: {
    strategy: "jwt",
    },
    handler: async function (request, h) {
    try {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id)
      const api = process.env.openweathermap_key 
      const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${placemark.latitude}&lon=${placemark.longitude}&units=metric&appid=${api}`
      const result = await Axios.get(requestUrl); 
      if (!result) {
        return []
      }
      return result.data;
    } catch(err){
        return err;
      }
    }
  },
};