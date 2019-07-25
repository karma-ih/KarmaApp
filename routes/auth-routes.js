const express = require("express");
const authRoutes = express.Router();

const passport = require("passport");
const bcrypt = require("bcrypt");

const User = require("../models/user-model");

authRoutes.post("/signup", (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

  if (password.length < 7) {
    res.status(400).json({
      message: "Please make your password at least 8 characters long"
    });
    return;
  }

  User.findOne({ username: username })
    .then(user => {
      if (user) {
        return res.status(409).json({ message: "Username is already taken" });
      }

      const salt = bcrypt.genSaltSync(11);
      const hashPass = bcrypt.hashSync(password, salt);

      return User.create({
        username,
        password: hashPass
      }).then(newUser => {
        req.login(newUser, err => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error while attempting login" });
          }

          res.status(200).json(newUser);
        });
      });
    })
    .catch(err => {
      res.status(500).json({ message: "Error at signup" });
    });
});

authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error while authenticating" });
    } else if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.login(user, err => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error while attempting to login" });
      }

      return res.status(200).json(user);
    });
  })(req, res);
});

authRoutes.post("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({ message: "User was succesfully logged out" });
  console.log("loggedout");
});

authRoutes.get("/loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorised" });
});

module.exports = authRoutes;
