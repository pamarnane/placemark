import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  name: String,
  category: String,
  description: String,
  latitude: Number,
  longitude: Number,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "Placemark",
  },
});

const categorySchema = new Schema({
  category: String,
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
export const Category = Mongoose.model("Category", categorySchema);