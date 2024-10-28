const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const HistorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = History = mongoose.model("histories", HistorySchema);
