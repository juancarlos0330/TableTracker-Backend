const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MaterialSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  unit: {
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

module.exports = Material = mongoose.model("materials", MaterialSchema);
