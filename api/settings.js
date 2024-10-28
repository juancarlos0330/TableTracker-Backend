const express = require("express");
const router = express.Router();

// Load Sever model
const Setting = require("../models/Setting");

// Load Role model
const Role = require("../models/Role");

// Load History model
const History = require("../models/History");

// Get server data
router.get("/all", (req, res) => {
  Setting.find()
    .then((settings) => res.json(settings))
    .catch((err) => console.log(err));
});

// Get role data
router.get("/roleall", (req, res) => {
  Role.find()
    .then((roles) => res.json(roles))
    .catch((err) => console.log(err));
});

// Add server data
router.post("/add", (req, res) => {
  const newSettings = new Setting({
    server_url: req.body.url,
  });

  newSettings
    .save()
    .then((settings) => {
      const newHistory = new History({
        name: "Admin",
        path: "Setting",
        action: "Add Setting item",
      });

      newHistory.save().then((histories) => {
        res.json({ msg: "success" });
      });
    })
    .catch((err) => console.log(err));
});

// Add role data
router.post("/roleadd", (req, res) => {
  const newRole = new Role({
    name: req.body.name,
  });
  newRole
    .save()
    .then((roles) => {
      const newHistory = new History({
        name: "Admin",
        path: "Setting",
        action: "Add Role item",
      });

      newHistory.save().then((histories) => {
        res.json({ msg: "success" });
      });
    })
    .catch((err) => console.log(err));
});

// Edit role data
router.post("/editrole", (req, res) => {
  Role.findByIdAndUpdate(
    { _id: req.body.id },
    { $set: { name: req.body.name } },
    { new: true }
  )
    .then((roles) => {
      const newHistory = new History({
        name: "Admin",
        path: "Setting",
        action: "Edit Role item",
      });

      newHistory.save().then((histories) => {
        res.json({ msg: "Edit success" });
      });
    })
    .catch((err) => console.log(err));
});

// Set server data
router.post("/set", (req, res) => {
  Setting.find().then((settings) => {
    settings.map((item, key) => {
      Setting.findOneAndUpdate(
        { _id: item.id },
        { $set: { flag: false } },
        { new: true }
      ).then((sett) => sett);
    });
  });

  Setting.findById(req.body.id)
    .then((settings) => {
      if (settings) {
        settings.flag = true;
        settings.save();
        const newHistory = new History({
          name: "Admin",
          path: "Setting",
          action: "Edit Setting item",
        });

        newHistory.save().then((histories) => {
          res.json({ msg: "Edit success" });
        });
      }
    })
    .catch((err) => console.log(err));
});

// delete server data
router.post("/delete", (req, res) => {
  Setting.findOneAndRemove({ _id: req.body.id })
    .then((settings) => {
      const newHistory = new History({
        name: "Admin",
        path: "Setting",
        action: "Delete Setting item",
      });

      newHistory.save().then((histories) => {
        res.json({ msg: "Delete success!" });
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
