import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { validationError } from "../logger.js";
import { PlacemarkArray, IdSpec, PlacemarkSpec } from "../models/db/joi-schemas.js";

export const placemarkApi = {
  find: {
    auth: false,
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
    auth: false,
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
    response: { schema: PlacemarkArray, failAction: validationError },
    validate: { params: {id: IdSpec}, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.addPlacemark(request.payload);
        if (placemark) {
          return h.response(placemark).code(201);
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
    auth: false,
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
};