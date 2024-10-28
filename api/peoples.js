const express = require("express");
const router = express.Router();
const multer = require("multer");

// Load People model
const People = require("../models/People");

// Load History model
const History = require("../models/History");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "\\..\\upload\\peoples");
  },
  filename: async function (req, file, cb) {
    filename = "";
    await file.originalname.split(" ").map((value, key) => {
      filename += value;
    });
    filename = Date.now() + "_" + filename;
    await cb(null, filename);
  },
});

const upload = multer({ storage: storage });

// add Peoples data
router.post("/add", upload.single("photo"), (req, res) => {
  const newPeoples = new People({
    name: req.body.name,
    role: req.body.role,
    image_uri: "/peoples/" + filename,
  });

  newPeoples
    .save()
    .then((peoples) => {
      const newHistory = new History({
        name: "Admin",
        path: "People",
        action: "Add People",
      });

      newHistory.save().then((histories) => {
        res.json({ msg: "success" });
      });
    })
    .catch((err) => console.log(err));
});

// Get all Peoples data
router.get("/all", (req, res) => {
  People.find()
    .populate({
      path: "role",
    })
    .then((peoples) => res.json(peoples))
    .catch((err) => console.log(err));
});

// Delete Peoples data by id
router.post("/delete", (req, res) => {
  People.findOneAndRemove({ _id: req.body.id })
    .then((peoples) => {
      const newHistory = new History({
        name: "Admin",
        path: "People",
        action: "Delete People",
      });

      newHistory.save().then((histories) => {
        res.json({ msg: "Delete success!" });
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
