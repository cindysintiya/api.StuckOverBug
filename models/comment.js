const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ref: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
    required: true,
  },
  contents: { type: String, required: true },
  time: { type: Date, required: true, default: Date },
});

module.exports = mongoose.model("Comment", userSchema, "comment");
