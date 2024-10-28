const express = require("express");
const router = express.Router();

const multer = require("multer");

// Load Activity model
const Activity = require("../models/Activity");

// Load Sub Activity model
const Actactivity = require("../models/Actactivity");
const Matactivity = require("../models/Matactivity");
const Toolactivity = require("../models/Toolactivity");

// Load History model
const History = require("../models/History");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "\\..\\upload\\activity");
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

// Add activity item
router.post("/add", upload.single("photo"), (req, res) => {
  const newActivity = new Activity({
    name: req.body.name,
    image_url: "/activity/" + filename,
  });

  newActivity
    .save()
    .then((activities) => {
      const newHistory = new History({
        name: "Admin",
        path: "Activity",
        action: "Add Activity item",
      });

      newHistory.save().then((histories) => {
        res.json({ msg: "Success!" });
      });
    })
    .catch((err) => console.log(err));
});

// Get all activities data
router.get("/all", (req, res) => {
  Activity.find()
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

// Add material data on activity
router.post("/matadd", (req, res) => {
  const newMatactivity = new Matactivity({
    material: req.body.mid,
    amount: req.body.amount,
  });

  newMatactivity
    .save()
    .then((matactivities) => {
      Activity.findOne({ _id: req.body.id }).then((activities) => {
        activities.material.unshift(matactivities._id);
        activities.save().then((activi) => {
          const newHistory = new History({
            name: "Admin",
            path: "Activity",
            action: "Add material of Activity item",
          });

          newHistory.save().then((histories) => {
            res.json(activi);
          });
        });
      });
    })
    .catch((err) => console.log(err));
});

// Add tool data on activity
router.post("/tooladd", (req, res) => {
  const newToolactivity = new Toolactivity({
    tool: req.body.tid,
    amount: req.body.amount,
  });

  newToolactivity
    .save()
    .then((toolactivities) => {
      Activity.findOne({ _id: req.body.id }).then((activities) => {
        activities.tool.unshift(toolactivities._id);
        activities.save().then((activi) => {
          const newHistory = new History({
            name: "Admin",
            path: "Activity",
            action: "Add tool of Activity item",
          });

          newHistory.save().then((histories) => {
            res.json(activi);
          });
        });
      });
    })
    .catch((err) => console.log(err));
});

// Add people data on activity
router.post("/peopleadd", (req, res) => {
  Activity.findOne({ _id: req.body.id }).then((activities) => {
    activities.people.unshift(req.body.pid);
    activities.save().then((activi) => {
      const newHistory = new History({
        name: "Admin",
        path: "Activity",
        action: "Add people of Activity item",
      });

      newHistory.save().then((histories) => {
        res.json(activi);
      });
    });
  });
});

// Add subactivity data on activity
router.post("/subactadd", (req, res) => {
  const newActactivity = new Actactivity({
    activity: req.body.aid,
    amount: req.body.amount,
  });

  newActactivity
    .save()
    .then((actactivities) => {
      Activity.findOne({ _id: req.body.id }).then((activities) => {
        activities.activity.unshift(actactivities._id);
        activities.save().then((activi) => {
          const newHistory = new History({
            name: "Admin",
            path: "Activity",
            action: "Add subactivity of Activity item",
          });

          newHistory.save().then((histories) => {
            res.json(activi);
          });
        });
      });
    })
    .catch((err) => console.log(err));
});

// Delete activity data by id
router.post("/delete", (req, res) => {
  Activity.findOneAndRemove({ _id: req.body.id })
    .then((activities) => {
      const newHistory = new History({
        name: "Admin",
        path: "Activity",
        action: "Delete Activity item",
      });

      newHistory.save().then((histories) => {
        res.json({ msg: "Delete success!" });
      });
    })
    .catch((err) => console.log(err));
});

// Delete sub material with activity by id
router.post("/submatdel", (req, res) => {
  Activity.findOne({ _id: req.body.id })
    .then((activities) => {
      // Get remove index
      const removeIndex = activities.material.indexOf(req.body.did);

      // Splice out of array
      activities.material.splice(removeIndex, 1);

      activities.save().then((activi) => {
        Matactivity.findOneAndRemove({ _id: req.body.did })
          .then((matact) => {
            const newHistory = new History({
              name: "Admin",
              path: "Activity",
              action: "Delete material of Activity item",
            });

            newHistory.save().then((histories) => {
              res.json({ msg: "Delete success!" });
            });
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));
});

// Delete sub tool with activity by id
router.post("/subtooldel", (req, res) => {
  Activity.findOne({ _id: req.body.id })
    .then((activities) => {
      // Get remove index
      const removeIndex = activities.tool.indexOf(req.body.did);

      // Splice out of array
      activities.tool.splice(removeIndex, 1);

      activities.save().then((activi) => {
        Toolactivity.findOneAndRemove({ _id: req.body.did })
          .then((toolact) => {
            const newHistory = new History({
              name: "Admin",
              path: "Activity",
              action: "Delete tool of Activity item",
            });

            newHistory.save().then((histories) => {
              res.json({ msg: "Delete success!" });
            });
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));
});

// Delete sub activity with activity by id
router.post("/subactdel", (req, res) => {
  Activity.findOne({ _id: req.body.id })
    .then((activities) => {
      // Get remove index
      const removeIndex = activities.activity.indexOf(req.body.did);

      // Splice out of array
      activities.activity.splice(removeIndex, 1);

      activities.save().then((activi) => {
        Actactivity.findOneAndRemove({ _id: req.body.did })
          .then((actact) => {
            const newHistory = new History({
              name: "Admin",
              path: "Activity",
              action: "Delete subactivity of Activity item",
            });

            newHistory.save().then((histories) => {
              res.json({ msg: "Delete success!" });
            });
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));
});

// Delete sub people with activity by id
router.post("/subpeopledel", (req, res) => {
  Activity.findOne({ _id: req.body.id })
    .then((activities) => {
      // Get remove index
      const removeIndex = activities.people.indexOf(req.body.did);

      // Splice out of array
      activities.people.splice(removeIndex, 1);

      activities.save().then((activi) => {
        const newHistory = new History({
          name: "Admin",
          path: "Activity",
          action: "Delete people of Activity item",
        });

        newHistory.save().then((histories) => {
          res.json({ msg: "Delete success!" });
        });
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
