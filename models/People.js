const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PeopleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "roles",
  },
  image_uri: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = People = mongoose.model("peoples", PeopleSchema);
