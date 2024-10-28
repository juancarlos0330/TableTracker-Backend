const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ActactivitySchema = new Schema({
  activity: {
    type: Schema.Types.ObjectId,
    ref: "activities",
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Actactivity = mongoose.model(
  "actactivities",
  ActactivitySchema
);
