import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { validationError } from "../logger.js";
import { PlacemarkArray, IdSpec, PlacemarkSpec } from "../models/db/joi-schemas.js";


export const visitApi = {
    find: {
        auth: {
          strategy: "jwt",
        },
        handler: async function (request, h) {
          try {
            const visits = await db.visitStore.getAllVisits();
            return visits;
          } catch (err) {
            return Boom.serverUnavailable("Database Error");
          }
        },
        tags: ["api"],
        description: "Get all visits",
        notes: "Returns details of all visits",
        // response: { schema: PlacemarkArray, failAction: validationError },
      },

      getPlacemarkVisits: {
        auth: {
          strategy: "jwt",
        },
        handler: async function (request, h) {
          try {
            const visits = await db.visitStore.getPlacemarkVisits(request.params.id);
            if (!visits) {
              return Boom.notFound("No visits with this id");
            }
            return visits;
          } catch (err) {
            return Boom.serverUnavailable("Database error");
          }
        },
        tags: ["api"],
        description: "Get all placemarkApi",
        notes: "Returns details of all placemarkApi",
        // response: { schema: PlacemarkSpec, failAction: validationError },
        // validate: { params: {id: IdSpec}, failAction: validationError },
      },
    

    create: {
        auth: {
        strategy: "jwt",
        },
        handler: async function (request, h) {
        try {
            const visit = await db.visitStore.addVisit(request.payload)
            if (visit) {
            return h.response(visit).code(201);
            }
            return Boom.badImplementation("error creating visit");
        } catch (err) {
            return Boom.serverUnavailable("Database Error");
        }
        },
        tags: ["api"],
        description: "Log a visit",
        notes: "Returns the logged visit",
        /* response: { schema: PlacemarkSpec, failAction: validationError },
        validate: { payload: PlacemarkSpec, failAction: validationError }, */
    },

    storeImage: {
      auth: {
      strategy: "jwt",
      },
      handler: async function (request, h) {
      try {
        let placemark = await db.placemarkStore.getPlacemarkById(request.payload.id);
        const url = request.payload.url;
        placemark.img = url;
        placemark.publicid = request.payload.publicid;
        placemark = await db.placemarkStore.updatePlacemark(placemark);
        return h.response(placemark).code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
        }
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    },

    deleteImage: {
      auth: {
      strategy: "jwt",
      },
      handler: async function (request, h) {
      try {
        let placemark = await db.placemarkStore.getPlacemarkById(request.params.id)
        const success = await db.imageStore.deleteImage(placemark.publicid);
        // success = db.imageStore.deleteImage(request.params.id);
        const updatedPlacemark = placemark;
          updatedPlacemark.img = "...";
          updatedPlacemark.publicid = "..."; 
       //   await db.imageStore.deleteImage(request.params.id);
        placemark = await db.placemarkStore.updatePlacemark(updatedPlacemark);
        // return h.response(updatedPlacemark).code(201);
        return 1;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
        }
      }
    }

};