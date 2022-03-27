import { handler } from "@hapi/hapi/lib/cors.js";
import _ from "lodash";
import { db } from "../models/db.js";
import { PlacemarkSpec } from "../models/db/joi-schemas.js";
import { imageStore } from "../models/image-store.js";



export const visitController = {
   index: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const visits = await db.visitStore.getPlacemarkVisits(placemark._id);
      const activities = await db.placemarkStore.getAllActivities();
      const viewData = {
        title: "Visit Log Dashboard",
        placemark: placemark,
        visits: visits,
        activities: activities,
      };
      return h.view("visit-view", viewData);
    },
  }, 

  addVisit: {
    handler: async function (request, h) {   
      const newVisit = {
        placemarkid: request.params.id,
        // name: request.payload.name,
        activity: request.payload.activity,
        date: request.payload.date,
        description: request.payload.description,
      };
      await db.visitStore.addVisit(newVisit);
      return h.redirect(`/placemark/${newVisit.placemarkid}`);
    },
  },

  deleteVisit: {
    handler: async function (request, h) {
    await db.visitStore.deleteVisit(request.params.id);
    // logger.info(`Deleting Placemark ${placemarkId}`);
    return h.redirect(`/placemark/${request.params.placemarkid}`);
    },
  },

  uploadImage: {
    handler: async function(request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          placemark.img = url;
          db.placemarkStore.updatePlacemark(placemark);
        }
        return h.redirect(`/placemark/${placemark._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/placemark/${placemark._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    }
  }
  
};