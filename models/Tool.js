const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ToolSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Tool = mongoose.model("tools", ToolSchema);
