const express = require("express");
const authRoutes = express.Router();

const passport = require("passport");
const bcrypt = require("bcrypt");

const User = require("../models/User");

const {
  performStartKarmaPayment,
  checkUserTransactions
} = require("./transactions");

authRoutes.post("/signup", (req, res, next) => {
  const {
    username,
    password,
    email,
    phoneNumber,
    street,
    postalCode,
    city,
    country,
    imageUrl,
    facebookId,
    facebookName
  } = req.body;

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
        password: hashPass,
        email,
        facebookId,
        phoneNumber,
        facebookName,
        address: {
          street,
          postalCode,
          city,
          country
        },
        imageUrl
      }).then(newUser => {
        req.login(newUser, err => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error while attempting login" });
          }
        });
        // login karma payment
        const amount = 100;
        const type = "completed"; // change to "initial"
        const userId = newUser._id;
        return performStartKarmaPayment(amount, type, userId, res);
        // ends here
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error at signup" });
    });
});

authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", async (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error while authenticating" });
    } else if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const test = await checkUserTransactions(user);
    console.log(test);
    if (test) {
      req.login(user, err => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error while attempting to login" });
        }

        return res.status(200).json(user);
      });
    } else res.status(500).json({ message: "Fraud detected" });
  })(req, res);
});

authRoutes.post("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({ message: "User was succesfully logged out" });
  console.log("loggedout");
});

authRoutes.get("/loggedin", (req, res, next) => {
  res.json(req.user);
});

authRoutes.put("/editprofile", (req, res, next) => {
  const {
    email,
    phoneNumber,
    street,
    postalCode,
    city,
    country,
    imageUrl
  } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      email,
      phoneNumber,
      address: {
        street,
        postalCode,
        city,
        country
      },
      imageUrl
    },
    { new: true }
  ).then(user => {
    console.log(user);
    res.json(user);
  });
});

//Facebook Verification

authRoutes.post("/facebook/verify", (req, res) => {
  // console.log(req.body);
  const { id } = req.body;

  User.findOne({ facebookId: id })
    .then(user => {
      if (user) {
        console.log(user);
        return res
          .status(200)
          .json({ message: "Facebook account already in use" });
      } else
        return res
          .status(200)
          .json({ message: "Facebook verification complete" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error at facebook verification" });
    });
});

module.exports = authRoutes;
