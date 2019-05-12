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

module.exports = router;
