import { Visit } from "./visit.js";

export const visitMongoStore = {
  async getAllVisits() {
    const visits = await Visit.find().lean();
    return visits;
  },

  async getVisitById(id) {
    if (id) {
      const visit = await Visit.findOne({ _id: id }).lean();
      return visit;
    }
    return null;
  },

  async getUserVisits(id) {
    const visit = await Visit.find({ userid: id }).lean();
    return visit;
  },

  async getPlacemarkVisits(id) {
    const visit = await Visit.find({ placemarkid: id }).lean();
    return visit;
  },

  async addVisit(visit) {
    const newVisit = new Visit(visit);
    const visitObj = await newVisit.save();
    return this.getVisitById(visitObj._id);
  },

  async deleteVisit(id) {
    try {
      await Visit.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllVisits() {
    await Visit.deleteMany({});
  },

};