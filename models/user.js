const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  profile: { type: String },
  realname: { type: String, required: true },
  email: { type: String, require: true },
  active: { type: Number, default: 1 },
});

module.exports = mongoose.model("User", userSchema, "user");
