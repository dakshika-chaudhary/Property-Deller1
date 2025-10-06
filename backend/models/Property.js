const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: { type: String, required: true },
  status: String,
  floor: String,
  transaction: String,
  furnishing: String,
  facing: String,
  overlooking: String,
  ownership: String,
  carpetArea: Number,
  bathroom: Number,
  balcony: Number,
  carParking: Number,
  superArea: Number,
  predictedPrice: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Property", PropertySchema);

