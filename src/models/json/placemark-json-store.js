import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/placemarks.json"));
db.data = { placemarks: [] };

export const placemarkJsonStore = {
  async getAllPlacemarks() {
    await db.read();
    return db.data.placemarks;
  },

  async addPlacemark(placemark) {
    await db.read();
    placemark._id = v4();
    db.data.placemarks.push(placemark);
    await db.write();
    return placemark;
  },

  async getPlacemarkById(id) {
    await db.read();
    let list = db.data.placemarks.find((placemark) => placemark._id === id);
    if (list) {
    list.tracks = await placemarkJsonStore.getPlacemarkById(list._id);
    }
    else {
      list = null;
    }
    return list;
  },

  async getUserPlacemarks(userid) {
    await db.read();
    return db.data.placemarks.filter((placemark) => placemark.userid === userid);
  },

  async deletePlacemarkById(id) {
    await db.read();
    const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);
    if (index !== -1) db.data.placemarks.splice(index, 1);
    await db.write();
  },

  async deleteAllPlacemarks() {
    db.data.placemarks = [];
    await db.write();
  },
};