const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SettingSchema = new Schema({
  server_url: {
    type: String,
    required: true,
  },
  flag: {
    type: Boolean,
    default: false,
  },
});

module.exports = Setting = mongoose.model("settings", SettingSchema);
