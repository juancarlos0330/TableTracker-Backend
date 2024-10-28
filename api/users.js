const { errors } = require("ethers");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Load Input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load Material model
const User = require("../models/User");

// Load History model
const History = require("../models/History");

// Register user
router.post("/reg", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const newHistory = new History({
                name: user.email,
                path: "Auth",
                action: "User sign up page",
              });

              newHistory.save().then((histories) => {
                const payload = {
                  id: user.id,
                  username: user.username,
                  email: user.email,
                };
                res.json(payload);
              });
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// Login user
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.logemail = "User not found";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const newHistory = new History({
          name: user.email,
          path: "Auth",
          action: "User sign in page",
        });

        newHistory.save().then((histories) => {
          // User Matched
          const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
          };
          res.json(payload);
        });
      } else {
        errors.logpassword = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
