import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  name: String,
  category: String,
  description: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "Placemark",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);