const express = require("express");

const Db = require("../data/db.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = await Db.find();
    res.status(200).json(db);
  } catch (err) {
    //loggin err to db
    res.status(500).json({
      err: "Error retriving posts"
    });
  }
});

router.post("/", async (req, res) => {
  const newPost = req.body;
  if (newPost.title && newPost.contents) {
    try {
      const post = await Db.insert(newPost);
      res.status(201).json(post);
    } catch (err) {
      res.status(500).json({
        err: "There was an error while saving the post to the database"
      });
    }
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const specificPost = await Db.findById(id);
    if (id) {
      res.json(specificPost);
    } else {
      //Error doesnt seem to work
      res.status(404).json("The post with the specified ID does not exist.");
    }
  } catch (err) {
    res.status(500).json({
      err: "The post information could not be retrieved."
    });
  }
});

module.exports = router;
