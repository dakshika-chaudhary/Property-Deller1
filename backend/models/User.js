const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  subscription: { type: String,enum: ["free", "pro", "enterprise"], default: "free" }, 
  predictionsUsed: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", UserSchema);