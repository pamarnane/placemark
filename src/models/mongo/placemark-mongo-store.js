import { Placemark, Category, Activity } from "./placemark.js";

export const placemarkMongoStore = {
  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  async getPlacemarkById(id) {
    if (id) {
      const placemark = await Placemark.findOne({ _id: id }).lean();
      return placemark;
    }
    return null;
  },

  async getUserPlacemarks(id) {
    const placemark = await Placemark.find({ userID: id }).lean();
    return placemark;
  },

  async addPlacemark(placemark) {
    const newPlacemark = new Placemark(placemark);
    const placemarkObj = await newPlacemark.save();
    return this.getPlacemarkById(placemarkObj._id);
  },

  async deletePlacemark(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlacemarks() {
    await Placemark.deleteMany({});
  },

  async getAllCategories() {
    const categories = await Category.find().lean();
    return categories;
  },

  async addCategory(category) {
    const newCategory = new Category(category)
    const categoryObj =await newCategory.save();
    return this.getCategorybyId(categoryObj.id);
  },

  async getCategorybyId(id) {
    const category =await Category.find({_id: id}).lean();
    return category;
  },

  async deleteCategoryById(id) {
    try {
      await Category.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async getAllActivities() {
    const activities = await Activity.find().lean();
    return activities;
  },

  async addActivity(activity) {
    const newActivity = new Activity(activity)
    const activityObj =await newActivity.save();
    return this.getActivitybyId(activityObj.id);
  },

  async getActivitybyId(id) {
    const activity =await Activity.find({_id: id}).lean();
    return activity;
  },

  async deleteActivityById(id) {
    try {
      await Activity.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async updatePlacemark(updatedPlacemark) {
    const placemark = await Placemark.findOne({ _id: updatedPlacemark._id });
    placemark.title = updatedPlacemark.title;
    placemark.img = updatedPlacemark.img;
    await placemark.save();
  },


};