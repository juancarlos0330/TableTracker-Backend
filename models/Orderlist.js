const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderlistSchema = new Schema({
  activity: {
    type: Schema.Types.ObjectId,
    ref: "activities",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  amount: {
    type: Number,
    required: true,
  },
  flag: {
    type: Boolean,
    default: false,
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
  },
});

module.exports = Orderlist = mongoose.model("orderlists", OrderlistSchema);
