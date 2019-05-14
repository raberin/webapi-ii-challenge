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
    if (specificPost.length) {
      res.json(specificPost);
    } else {
      res
        .status(404)
        .json({ err: "The post with the specified ID does not exist." });
    }
  } catch (err) {
    res.status(500).json({
      err: "The post information could not be retrieved."
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Db.remove(id);

    if (!deleted) {
      //Works does not return message
      res.status(404).json({ message: "The post does not exit" });
    } else {
      res.status(204).json({ message: "The post has been nuked" });
    }
  } catch (err) {}
});

// router.delete("/:id", async (req, res) => {
//   try {
//     const post = await Db.remove(req.params.id);
//     if (!post) {
//       res
//         .status(404)
//         .json({ message: "The post with the specified ID does not exist." });
//     } else {
//       res.status(200).json(post);
//     }
//   } catch (err) {
//     res.status(500).json({ error: "The post could not be removed" });
//   }
// });

router.put("/:id", async (req, res) => {
  const post = req.body;
  try {
    const updatedPost = await Db.update(req.params.id, req.body);
    if (!post.title || !post.contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    } else if (!updatedPost.id) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else {
      res.status(200).json(updatedPost);
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "The post information could not be modified." });
  }
});

module.exports = router;
