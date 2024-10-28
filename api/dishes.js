const express = require("express");
const router = express.Router();

// Load Activity model for dish
const Activity = require("../models/Activity");

// Load Order list model for dish
const Orderlist = require("../models/Orderlist");

// Load History model
const History = require("../models/History");

// Add dish item
router.post("/add", (req, res) => {
  Activity.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { flag: true } },
    { new: true }
  ).then((activities) => {
    const newHistory = new History({
      name: "Admin",
      path: "Dish",
      action: "Add Dish item",
    });

    newHistory.save().then((histories) => {
      res.json(activities);
    });
  });
});

// Get all dishes data
router.get("/all", (req, res) => {
  Activity.find({ flag: true })
    .populate({
      path: "tool",
      populate: {
        path: "tool",
      },
    })
    .populate({
      path: "material",
      populate: {
        path: "material",
      },
    })
    .populate({
      path: "people",
    })
    .populate({
      path: "activity",
      populate: {
        path: "activity",
      },
    })
    .then((activities) => res.json(activities))
    .catch((err) => console.log(err));
});

// Delete dish data by id
router.post("/delete", (req, res) => {
  Activity.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { flag: false } },
    { new: true }
  )
    .then((activities) => {
      const newHistory = new History({
        name: "Admin",
        path: "Dish",
        action: "Delete Dish item",
      });

      newHistory.save().then((histories) => {
        res.json(activities);
      });
    })
    .catch((err) => console.log(err));
});

// Get all dish data from user
router.get("/uall", (req, res) => {
  Activity.find({ flag: true })
    .then((activities) => res.json(activities))
    .catch((err) => console.log(err));
});

// Add order data from dish
router.post("/addorder", (req, res) => {
  const newOrderlist = new Orderlist({
    activity: req.body.id,
    user: req.body.uid,
    amount: req.body.amount,
  });

  newOrderlist
    .save()
    .then((resdata) => {
      const newHistory = new History({
        name: req.body.email,
        path: "Order",
        action: "Add order from dish item",
      });

      newHistory.save().then((histories) => {
        res.json({ msg: "success" });
      });
    })
    .catch((err) => console.log(err));
});
module.exports = router;
