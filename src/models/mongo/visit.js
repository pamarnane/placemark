import Mongoose from "mongoose";

const { Schema } = Mongoose;

const visitSchema = new Schema({
  name: String,
  activity: String,
  date: String,
  description: String,
  placemarkid: {
    type: Schema.Types.ObjectId,
    ref: "Placemark",
  },
});

export const Visit = Mongoose.model("Visit", visitSchema);