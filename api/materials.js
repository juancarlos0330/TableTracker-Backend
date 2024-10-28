const express = require("express");
const router = express.Router();

// Load Material model
const Material = require("../models/Material");

// Load History model
const History = require("../models/History");

// Get all materials data
router.get("/all", (req, res) => {
  Material.find()
    .then((materials) => res.json(materials))
    .catch((err) => console.log(err));
});

// add material data
router.post("/add", (req, res) => {
  const newMaterials = new Material({
    name: req.body.name,
    unit: req.body.unit,
  });

  newMaterials
    .save()
    .then((materials) => {
      const newHistory = new History({
        name: "Admin",
        path: "Material",
        action: "Add Item",
      });

      newHistory.save().then((histories) => {
        res.json({ msg: "success" });
      });
    })
    .catch((err) => console.log(err));
});

// Delete materials data by id
router.post("/delete", (req, res) => {
  Material.findOneAndRemove({ _id: req.body.id })
    .then((materials) => {
      const newHistory = new History({
        name: "Admin",
        path: "Material",
        action: "Delete Item",
      });

      newHistory.save().then((histories) => {
        res.json({ msg: "Delete success!" });
      });
    })
    .catch((err) => console.log(err));
});

// Add each material amount
router.post("/addamount", async (req, res) => {
  Material.findById(req.body.id)
    .then((materials) => {
      if (materials) {
        materials.amount = Number(materials.amount) + Number(req.body.amount);
        materials.save();
        const newHistory = new History({
          name: "Admin",
          path: "Material",
          action: "Add amount by item",
        });

        newHistory.save().then((histories) => {
          res.json({ msg: "Add success" });
        });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
