import mongoose from "mongoose";

const PropertyDataSchema = new mongoose.Schema({
  location: String,
  "Price (in rupees)": Number,
  "Carpet Area": Number,
  Status: String,
  Floor: String,
  Transaction: String,
  Furnishing: String,
  facing: String,
  overlooking: String,
  Bathroom: Number,
  Balcony: Number,
  "Car Parking": Number,
  Ownership: String,
  "Super Area": Number,
  "Amount(in rupees)": Number,
});

export default mongoose.model("PropertyData", PropertyDataSchema);
