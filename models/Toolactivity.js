const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ToolactivitySchema = new Schema({
  tool: {
    type: Schema.Types.ObjectId,
    ref: "tools",
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = Toolactivity = mongoose.model(
  "toolactivities",
  ToolactivitySchema
);
