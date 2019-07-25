const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Task = require("../models/task-model");

//POST ROUTE FOR TASKS
router.post("/", (req, res, next) => {
  console.log(req.body);
  Task.create({
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

//GET ROUTE FOR TASKS
router.get("/", (req, res, next) => {
  Task.find()
    .then(allTheTasks => {
      res.json(allTheTasks);
    })
    .catch(err => {
      res.json(err);
    });
});

//GET ROUTE FOR SPECIFIC TASK
router.get("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "specified ID is not valid" });
    return;
  }
  Task.findById(req.params.id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

//PUT ROUTE FOR SPECIFIC TASK
router.put("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified ID is not valid" });
    return;
  }

  Task.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `Task with ${req.params.id} is updated successfully`
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

  Task.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Task with id ${req.params.id} is removed successfully`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
