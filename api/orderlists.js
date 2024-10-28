const express = require("express");
const router = express.Router();

// Load Order list model for dish
const Orderlist = require("../models/Orderlist");

// Load History model
const History = require("../models/History");

// Get orderlist data by userid
router.post("/all", (req, res) => {
  Orderlist.find({ user: req.body.id, flag: false })
    .populate({
      path: "activity",
    })
    .then((orderlists) => res.json(orderlists))
    .catch((err) => console.log(err));
});

// Delete orderlist data by id
router.post("/delete", (req, res) => {
  Orderlist.findOneAndRemove({ _id: req.body.did })
    .then((orderlists) => {
      const newHistory = new History({
        name: req.body.email,
        path: "Order List",
        action: "Cancel order item",
      });

      newHistory.save().then((histories) => {
        res.json({ msg: "Delete success!" });
      });
    })
    .catch((err) => console.log(err));
});

// Order orderlist data
router.post("/order", (req, res) => {
  Orderlist.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { flag: true, updated_at: req.body.date } },
    { new: true }
  )
    .then((orderlists) => {
      const newHistory = new History({
        name: req.body.email,
        path: "Order List",
        action: "Add order item to list",
      });

      newHistory.save().then((histories) => {
        res.json(orderlists);
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
