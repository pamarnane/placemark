import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { placemarkMongoStore } from "./mongo/placemark-mongo-store.js"
import { visitMongoStore } from "./mongo/visit-mongo-store.js"
import { imageStore } from "./image-store.js"


export const db = {
  userStore: null,
  placemarkStore: null,

  init(storeType) {
    switch (storeType) {
      /* case "json":
        this.userStore = userJsonStore;
        this.placemarkStore = placemarkJsonStore;
        break; */
      case "mongo":
        this.userStore = userMongoStore;
        this.placemarkStore = placemarkMongoStore;
        this.visitStore = visitMongoStore;
        this.imageStore = imageStore;
        connectMongo();
        break;
      default:
        this.userStore = userMongoStore;
        this.placemarkStore = placemarkMongoStore;
        this.visitStore = visitMongoStore;
        this.imageStore = imageStore;
        connectMongo();
    }
  },
};