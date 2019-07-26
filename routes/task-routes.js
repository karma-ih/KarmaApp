const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Posting = require("../models/Posting");

//POST ROUTE FOR POSTINGS
router.post("/", (req, res, next) => {
  console.log(req.body);
  Posting.create({
    title: req.body.title,
    description: req.body.description,
    creator: req.user._id
  })
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
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
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "specified ID is not valid" });
    return;
  }
  Posting.findById(req.params.id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

//PUT ROUTE FOR SPECIFIC POSTING
router.put("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified ID is not valid" });
    return;
  }

  Posting.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `Posting with ${req.params.id} is updated successfully`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified ID is not valid" });
    return;
  }

  Posting.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Posting with id ${req.params.id} is removed successfully`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
