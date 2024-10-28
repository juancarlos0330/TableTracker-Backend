const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = Order = mongoose.model("orders", OrderSchema);
