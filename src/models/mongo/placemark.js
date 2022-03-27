import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  name: String,
  category: String,
  description: String,
  latitude: Number,
  longitude: Number,
  img: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const categorySchema = new Schema({
  category: String,
});

const activitySchema = new Schema({
  activity: String,
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
export const Category = Mongoose.model("Category", categorySchema);
export const Activity = Mongoose.model("Activity", activitySchema);