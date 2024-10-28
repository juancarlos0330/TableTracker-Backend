const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ActivitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  activity: [
    {
      type: Schema.Types.ObjectId,
      ref: "actactivities",
    },
  ],
  people: [
    {
      type: Schema.Types.ObjectId,
      ref: "peoples",
    },
  ],
  material: [
    {
      type: Schema.Types.ObjectId,
      ref: "matactivities",
    },
  ],
  tool: [
    {
      type: Schema.Types.ObjectId,
      ref: "toolactivities",
    },
  ],
  flag: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Activity = mongoose.model("activities", ActivitySchema);
