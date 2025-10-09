const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   userId: { type: String, required: true },
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

// const mongoose = require("mongoose");

// const PropertySchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   location: { type: String, required: true },
//   // optional geo coords to support map / proximity
//   locationCoords: {
//     lat: Number,
//     lng: Number
//   },
//   listedPrice: Number,        // actual price listed by seller (in ₹)
//   predictedPrice: Number,     // ML predicted price (in ₹)
//   status: String,
//   floor: String,
//   transaction: String,
//   furnishing: String,
//   facing: String,
//   overlooking: String,
//   ownership: String,
//   carpetArea: Number,
//   bathroom: Number,
//   balcony: Number,
//   carParking: Number,
//   superArea: Number,
//   views: { type: Number, default: 0 },
//   saves: { type: Number, default: 0 },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Property", PropertySchema);
