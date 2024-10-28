const express = require("express");
const router = express.Router();

// Load Order list model for dish
const Orderlist = require("../models/Orderlist");

// Load History model
const History = require("../models/History");

// Load sub activity model
const Actactivity = require("../models/Actactivity");

// Get orderlist all data
router.get("/all", (req, res) => {
  Orderlist.find({ flag: true })
    .populate({
      path: "activity",
      populate: {
        path: "activity",
        populate: {
          path: "activity",
          populate: {
            path: "activity",
            populate: {
              path: "activity",
              populate: {
                path: "activity",
                populate: {
                  path: "activity",
                  populate: {
                    path: "activity",
                    populate: {
                      path: "activity",
                      populate: {
                        path: "activity",
                        populate: {
                          path: "activity",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })
    .populate({
      path: "activity",
      populate: {
        path: "tool",
        populate: {
          path: "tool",
        },
      },
    })
    .populate({
      path: "activity",
      populate: {
        path: "material",
        populate: {
          path: "material",
        },
      },
    })
    .populate({
      path: "activity",
      populate: {
        path: "people",
      },
    })
    .populate({
      path: "user",
    })
    .populate({
      path: "activity",
      populate: {
        path: "activity",
        populate: {
          path: "activity",
          populate: {
            path: "material",
            populate: {
              path: "material",
            },
          },
        },
      },
    })
    .populate({
      path: "activity",
      populate: {
        path: "activity",
        populate: {
          path: "activity",
          populate: {
            path: "tool",
            populate: {
              path: "tool",
            },
          },
        },
      },
    })
    .populate({
      path: "activity",
      populate: {
        path: "activity",
        populate: {
          path: "activity",
          populate: {
            path: "people",
          },
        },
      },
    })
    .then((orderlists) => res.json(orderlists))
    .catch((err) => console.log(err));
});

// Get orderlist data by userid
router.post("/all", (req, res) => {
  Orderlist.find({ user: req.body.id, flag: true })
    .populate({
      path: "activity",
      populate: {
        path: "activity",
        populate: {
          path: "activity",
          populate: {
            path: "activity",
            populate: {
              path: "activity",
              populate: {
                path: "activity",
                populate: {
                  path: "activity",
                  populate: {
                    path: "activity",
                    populate: {
                      path: "activity",
                      populate: {
                        path: "activity",
                        populate: {
                          path: "activity",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })
    .populate({
      path: "activity",
      populate: {
        path: "tool",
        populate: {
          path: "tool",
        },
      },
    })
    .populate({
      path: "activity",
      populate: {
        path: "material",
        populate: {
          path: "material",
        },
      },
    })
    .populate({
      path: "activity",
      populate: {
        path: "people",
      },
    })
    .populate({
      path: "user",
    })
    .populate({
      path: "activity",
      populate: {
        path: "activity",
        populate: {
          path: "activity",
          populate: {
            path: "material",
            populate: {
              path: "material",
            },
          },
        },
      },
    })
    .populate({
      path: "activity",
      populate: {
        path: "activity",
        populate: {
          path: "activity",
          populate: {
            path: "tool",
            populate: {
              path: "tool",
            },
          },
        },
      },
    })
    .populate({
      path: "activity",
      populate: {
        path: "activity",
        populate: {
          path: "activity",
          populate: {
            path: "people",
          },
        },
      },
    })
    .then((orderlists) => res.json(orderlists))
    .catch((err) => console.log(err));
});

// Update orderlist data by userid (waiting)
router.post("/updatewaiting", (req, res) => {
  Orderlist.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { status: 1, updated_at: req.body.date } },
    { new: true }
  )
    .then((orderlists) => {
      const newHistory = new History({
        name: req.body.email,
        path: "Order List",
        action: "Change order status as running",
      });

      newHistory.save().then((histories) => {
        res.json(orderlists);
      });
    })
    .catch((err) => console.log(err));
});

// Update orderlist data by userid (running)
router.post("/updaterunning", (req, res) => {
  Orderlist.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { status: 2, updated_at: req.body.date } },
    { new: true }
  )
    .then((orderlists) => {
      const newHistory = new History({
        name: req.body.email,
        path: "Order List",
        action: "Change order status as completed",
      });

      newHistory.save().then((histories) => {
        res.json(orderlists);
      });
    })
    .catch((err) => console.log(err));
});

// Update modal sub activity data by userid (waiting)
router.post("/modalupdatewaiting", (req, res) => {
  Actactivity.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { status: 1, updated_at: req.body.date } },
    { new: true }
  )
    .then((actactivities) => {
      const newHistory = new History({
        name: req.body.email,
        path: "Order List",
        action: "Change sub activity status as running",
      });

      newHistory.save().then((histories) => {
        res.json(actactivities);
      });
    })
    .catch((err) => console.log(err));
});

// Update modal sub activity data by userid (running)
router.post("/modalupdaterunning", (req, res) => {
  Actactivity.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { status: 2, updated_at: req.body.date } },
    { new: true }
  )
    .then((subactivities) => {
      const newHistory = new History({
        name: req.body.email,
        path: "Order List",
        action: "Change sub activity status as completed",
      });

      newHistory.save().then((histories) => {
        res.json(subactivities);
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
