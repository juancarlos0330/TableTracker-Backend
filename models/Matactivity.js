const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MatactivitySchema = new Schema({
  material: {
    type: Schema.Types.ObjectId,
    ref: "materials",
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = Matactivity = mongoose.model(
  "matactivities",
  MatactivitySchema
);
