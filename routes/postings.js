const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const router = express.Router();

// LocationIQ geocode setup
const apiKey = process.env.LOCATION_IQ_KEY;

const Posting = require("../models/Posting");
const User = require("../models/User");
const performTransaction = require("./transactions");

//POST ROUTE FOR POSTINGS
router.post("/", (req, res, next) => {
  const {
    title,
    description,
    karma,
    selectedLocation,
    street,
    zip,
    city,
    latitude,
    longitude
  } = req.body;
  const user = req.body.user;

  if (selectedLocation === "current") {
    const queryString = `https://eu1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;

    axios.get(queryString).then(response => {
      const queryStreet = response.data.address.address29;
      const queryZip = response.data.address.postcode;
      const queryCity = response.data.address.city;
      console.log(`Location geocoded: ${queryStreet}`);
      return Posting.create({
        title,
        description,
        creator: user._id,
        karma,
        address: {
          street: queryStreet,
          postalCode: queryZip,
          city: queryCity
        },
        location: {
          type: "Point",
          coordinates: [latitude, longitude]
        }
      })
        .then(response => {
          console.log(
            `Posting saved to Database with title: ${response.title}`
          );
          const postingId = response._id;
          const amount = -karma;
          const type = "escrow";
          const userId = response.creator;
          return performTransaction(postingId, amount, type, userId, res);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  if (selectedLocation === "home") {
    const userStreet = user.address.street;
    const userCity = user.address.city;
    const userZip = user.address.postalCode;
    const queryString = `https://eu1.locationiq.com/v1/search.php?key=${apiKey}&street=${userStreet}&city=${userCity}&postalcode=${userZip}&format=json`;

    return axios
      .get(queryString)
      .then(response => {
        const queryLatitude = response.data[0].lat;
        const queryLongitude = response.data[0].lon;
        console.log(`Location geocoded: ${userStreet}`);

        return Posting.create({
          title,
          description,
          creator: user._id,
          karma,
          address: {
            street: userStreet,
            postalCode: userZip,
            city: userCity
          },
          location: {
            type: "Point",
            coordinates: [queryLatitude, queryLongitude]
          }
        }).then(response => {
          console.log(
            `Posting saved to Database with title: ${response.title}`
          );
          const postingId = response._id;
          const amount = -karma;
          const type = "escrow";
          const userId = response.creator;
          return performTransaction(postingId, amount, type, userId, res);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  if (selectedLocation === "other") {
    const queryString = `https://eu1.locationiq.com/v1/search.php?key=${apiKey}&street=${street}&city=${city}&postalcode=${zip}&format=json`;
    axios
      .get(queryString)
      .then(response => {
        const queryLatitude = response.data[0].lat;
        const queryLongitude = response.data[0].lon;
        return Posting.create({
          title,
          description,
          creator: user._id,
          karma,
          address: {
            street: street,
            postalCode: zip,
            city: city
          },
          location: {
            type: "Point",
            coordinates: [queryLatitude, queryLongitude]
          }
        }).then(response => {
          console.log(
            `Posting saved to Database with title: ${response.title}`
          );
          const postingId = response._id;
          const amount = -karma;
          const type = "escrow";
          const userId = response.creator;
          return performTransaction(postingId, amount, type, userId, res);
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
});

//GET ROUTE FOR POSTINGS
router.get("/", (req, res, next) => {
  Posting.find()
    .then(allPostings => {
      res.json(allPostings);
    })
    .catch(err => {
      res.json(err);
    });
});

//GET ROUTE FOR SPECIFIC Posting
router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "specified ID is not valid" });
    return;
  }
  Posting.findById(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

//PUT ROUTE FOR UPDATING A SPECIFIC POSTING
router.put("/:id", (req, res, next) => {
  const { id, description } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified ID is not valid" });
    return;
  }

  Posting.findByIdAndUpdate(id, { description })
    .then(() => {
      res.json({
        message: `Posting with ${id} is updated successfully`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified ID is not valid" });
    return;
  }

  Posting.findByIdAndRemove(id)
    .then(() => {
      res.json({
        message: `Posting with id ${id} is removed successfully`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
