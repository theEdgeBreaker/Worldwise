import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  cityName: String,
  country: String,
  emoji: String,
  date: Date,
  notes: String,
  position: {
    lat: Number,
    lng: Number
  },
  id: Number
});

export default mongoose.model("cities", citySchema);
