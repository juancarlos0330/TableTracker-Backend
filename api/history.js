const express = require("express");
const router = express.Router();

// Load History model

const History = require("../models/History");

// Get all history data
router.get("/all", (req, res) => {
  History.find()
    .then((history) => res.json(history))
    .catch((err) => console.log(err));
});

module.exports = router;
