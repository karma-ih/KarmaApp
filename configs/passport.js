const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt"); // !!!
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});

passport.use(
  new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }

      if (!foundUser) {
        next(null, false, { message: "Incorrect credentials." });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        next(null, false, { message: "Incorrect credentials." });
        return;
      }

      next(null, foundUser);
    });
  })
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("facebook acount details", profile);
      User.findOne({ facebookId: profile.id })
        .then(user => {
          if (user) return done(null, user);

          return User.create({
            facebookId: profile.id,
            fullName: profile.displayName
          }).then(newUser => {
            return done(null, newUser);
          });
        })
        .catch(err => {
          done(err);
        });
    }
  )
);
