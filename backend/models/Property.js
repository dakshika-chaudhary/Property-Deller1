// const mongoose = require('mongoose');

// const PropertySchema = new mongoose.Schema({
//   // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//    userId: { type: String, required: true },
//   location: { type: String, required: true },
//   status: String,
//   floor: String,
//   transaction: String,
//   furnishing: String,
//   facing: String,
//   overlooking: String,
//   ownership: String,
//   carpet_area: Number,
//   bathroom: Number,
//   balcony: Number,
//   car_parking: Number,
//   super_area: Number,
//   predictedPrice: Number,
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Property", PropertySchema);


const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  location: { type: String, required: true },
  status: String,
  floor: String,
  transaction: String,
  furnishing: String,
  facing: String,
  overlooking: String,
  ownership: String,
  carpet_area: Number,
  bathroom: Number,
  balcony: Number,
  car_parking: Number,
  super_area: Number,
  predictedPrice: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Property", PropertySchema);
