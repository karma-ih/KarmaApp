const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const router = express.Router();

// LocationIQ geocode setup
const apiKey = process.env.LOCATION_IQ_KEY;

const Posting = require("../models/Posting");
const User = require("../models/User");

//POST ROUTE FOR POSTINGS
router.post("/", (req, res, next) => {
  let {
    id,
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

  if (selectedLocation === "current") {
    const queryString = `https://eu1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;
    axios.get(queryString).then(
      response => {
        const queryStreet = response.data.address.address29;
        const queryZip = response.data.address.postcode;
        const queryCity = response.data.address.city;

        Posting.create({
          title,
          description,
          creator: id,
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
            res.json(response);
          })
          .catch(err => {
            res.json(err);
          });
      },
      error => {
        console.error(error);
      }
    );
  }

  if (selectedLocation === "home") {
    User.findById(id)
      .then(response => {
        const userStreet = response.address.street;
        const userCity = response.address.city;
        const userZip = response.address.postalCode;
        const queryString = `https://eu1.locationiq.com/v1/search.php?key=${apiKey}&street=${userStreet}&city=${userCity}&postalcode=${userZip}&format=json`;

        axios.get(queryString).then(
          response => {
            const queryLatitude = response.data[0].lat;
            const queryLongitude = response.data[0].lon;
            // console.log(response);
            Posting.create({
              title,
              description,
              creator: id,
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
            })
              .then(response => {
                res.json(response);
              })
              .catch(err => {
                res.json(err);
              });
          },
          error => {
            console.error(error);
          }
        );
      })
      .catch(err => {
        console.error(err);
      });
  }

  if (selectedLocation === "other") {
    const queryString = `https://eu1.locationiq.com/v1/search.php?key=${apiKey}&street=${street}&city=${city}&postalcode=${zip}&format=json`;
    axios
      .get(queryString)
      .then(
        response => {
          const queryLatitude = response.data[0].lat;
          const queryLongitude = response.data[0].lon;
          Posting.create({
            title,
            description,
            creator: id,
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
          })
            .then(response => {
              res.json(response);
            })
            .catch(err => {
              res.json(err);
            });
        },
        error => {
          console.error(error);
        }
      )
      .catch(err => {
        console.error(err);
      });
  }
});

router.post("/:id/message", (req, res, next) => {
  console.log(req.user._id);
  console.log(req.params.id);
  Posting.findByIdAndUpdate(req.params.id, {
    $push: { message: { message: req.body.message, user: req.user._id } }
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

//GET ROUTE FOR POSTINGS
router.get("/", (req, res, next) => {
  let query = {};
  if (req.query.user) {
    query = {
      creator: req.query.user
    };
  }
  // console.log(query);
  // console.log(req.query.user);

  Posting.find(query)
    .then(allPostings => {
      if (req.query.user) {
        Posting.find({ applicant: req.query.user }).then(postingsApplicant => {
          Posting.find({ otherParty: req.query.user }).then(
            postingOtherParty => {
              res.json({
                postings: allPostings,
                postings_applicant: postingsApplicant,
                postings_otherParty: postingOtherParty
              });
            }
          );
        });
      } else {
        res.json(allPostings);
      }
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
    .populate([
      { path: "creator", model: "User" },
      { path: "applicant", model: "User" },

      {
        path: "message.user",
        model: "User"
      }
    ])
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
  const { postId, applicantId } = req.body;
  console.log(postId);
  console.log(applicantId);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified ID is not valid" });
    return;
  }

  Posting.findByIdAndUpdate(postId, {
    $pull: { applicant: req.body.applicantId },
    $push: { otherParty: req.body.applicantId }
  })
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

router.post("/:id/apply", (req, res, next) => {
  console.log(req.params.id);
  console.log(req.user._id);
  Posting.findByIdAndUpdate(req.params.id, {
    $push: { applicant: req.user._id }
  })

    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
