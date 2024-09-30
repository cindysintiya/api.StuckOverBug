const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  type: { type: String, required: true, default: "question" },
  ref: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contents: { type: String, required: true },
  snippets: [{ 
    filename: { type: String },
    type: { type: String },
    code: { type: String },
  }],
  status: { type: Number, default: 2 },
  time: { type: Date, required: true, default: Date },
});

module.exports = mongoose.model("Thread", userSchema, "thread");
