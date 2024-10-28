const express = require("express");
const router = express.Router();

// Load Tool model
const Tool = require("../models/Tool");

// Load History model
const History = require("../models/History");

// Get all Tools data
router.get("/all", (req, res) => {
  Tool.find()
    .then((tools) => res.json(tools))
    .catch((err) => console.log(err));
});

// add Tools data
router.post("/add", (req, res) => {
  const newTools = new Tool({
    name: req.body.name,
  });

  newTools
    .save()
    .then((tools) => {
      const newHistory = new History({
        name: "Admin",
        path: "Tool",
        action: "Add Tool Item",
      });

      newHistory.save().then((histories) => {
        res.json({ msg: "success" });
      });
    })
    .catch((err) => console.log(err));
});

// Add each material amount
router.post("/addamount", async (req, res) => {
  Tool.findById(req.body.id)
    .then((tools) => {
      if (tools) {
        tools.amount = Number(tools.amount) + Number(req.body.amount);
        tools.save();

        const newHistory = new History({
          name: "Admin",
          path: "Tool",
          action: "Add Tool amount by item",
        });

        newHistory.save().then((histories) => {
          res.json({ msg: "Add success" });
        });
      }
    })
    .catch((err) => console.log(err));
});

// Delete Tools data by id
router.post("/delete", (req, res) => {
  Tool.findOneAndRemove({ _id: req.body.id })
    .then((tools) => {
      const newHistory = new History({
        name: "Admin",
        path: "Tool",
        action: "Delete Tool item",
      });

      newHistory.save().then((histories) => {
        res.json({ msg: "Delete success!" });
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
