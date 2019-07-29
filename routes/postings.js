const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Posting = require("../models/Posting");

//POST ROUTE FOR POSTINGS
router.post("/", (req, res, next) => {
  const { title, description, karma, street, zip, city } = req.body;

  Posting.create({ title, description, karma, street, zip, city })
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
