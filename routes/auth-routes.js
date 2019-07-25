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

  //   if (foundUser) {
  //     res
  //       .status(400)
  //       .json({ message: "Usernam already taken. Choose another one" });
  //     return;
  //   }

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

//   aNewUser.save(err => {
//     if (err) {
//       res.status(400).json({ message: "Saving user to database went wrong" });
//       return;
//     }

//     req.login(aNewUser, err => {
//       if (err) {
//         res.status(500).json({ message: "Login after signup went bad" });
//         return;
//       }

//       res.status(200).json(aNewUser);
//     });
//   });
// });

module.exports = authRoutes;
